import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import {
    NbDialogService,
    NbMediaBreakpointsService,
    NbMenuService,
    NbSidebarService,
    NbThemeService,
} from '@nebular/theme';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { AuthServices } from '../../../@core/services/auth.service';
import { CommonComponent } from '../../../shared/common/common.component';
import { ViewEncapsulation } from '@angular/core';
import { ProfileComponent } from '../../../shared/profile/profile.component';

@Component({
    selector: 'ngx-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();
    userPictureOnly: boolean = false;
    user: any;

    themes = [
        {
            value: 'default',
            name: 'Light',
        },
        {
            value: 'dark',
            name: 'Dark',
        },
        {
            value: 'cosmic',
            name: 'Cosmic',
        },
        {
            value: 'corporate',
            name: 'Corporate',
        },
    ];

    currentTheme: any;
    public contentInit = false;
    userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

    name: string;
    profile_pic: string;
    empData: any;

    constructor(
        private sidebarService: NbSidebarService,
        private menuService: NbMenuService,
        private themeService: NbThemeService,
        private layoutService: LayoutService,
        public auth: AuthServices,
        private breakpointService: NbMediaBreakpointsService,
        private dialog: NbDialogService,
        @Inject(DOCUMENT) private doc: Document
    ) {
        const savedTheme = this.getCurrentTheme();
        if (savedTheme) {
            this.setThemeStyle(savedTheme);
        }
    }

    ngOnInit() {
        this.currentTheme = this.themeService.currentTheme;

        // this.userService
        //     .getUsers()
        //     .pipe(takeUntil(this.destroy$))
        //     .subscribe((users: any) => (this.user = users.nick));

        this.menuService.onItemClick().subscribe((event) => {
            //boolean content init will stop the subscribed data from multiplying which cause incremental event
            if (this.contentInit == false) {
                this.onItemSelection(event.item.title);
            }
        });

        // this.name = this.auth.getTokenUsername();
        this.profile_pic = this.auth.getUserProfilePic() || 'no-photo.png';

        const { xl } = this.breakpointService.getBreakpointsMap();
        this.themeService
            .onMediaQueryChange()
            .pipe(
                map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
                takeUntil(this.destroy$)
            )
            .subscribe(
                (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
            );

        this.themeService
            .onThemeChange()
            .pipe(
                map(({ name }) => name),
                takeUntil(this.destroy$)
            )
            .subscribe((themeName) => {
                this.currentTheme = themeName;
                this.saveTheme(themeName);
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    changeTheme(themeName: string) {
        this.setThemeStyle(themeName);
    }

    setThemeStyle(themeName: string) {
        this.currentTheme = themeName;
        this.themeService.changeTheme(themeName);
        localStorage.setItem('theme', themeName);
    }

    saveTheme(themeName: string) {
        localStorage.setItem('theme', themeName);
    }

    getCurrentTheme() {
        return localStorage.getItem('theme');
    }

    toggleSidebar(): boolean {
        this.sidebarService.toggle(true, 'menu-sidebar');
        this.layoutService.changeLayoutSize();

        return false;
    }

    navigateHome() {
        this.menuService.navigateHome();
        return false;
    }

    async onItemSelection(title) {
        if (title === 'Log out') {
            let varData = {
                title: 'Log out',
                message: 'Are you sure you want to log out?',
                name: await this.auth.getTokenUsername(),
            };
            const dialogRef = this.dialog
                .open(CommonComponent, { context: { employeeId: varData } })
                .onClose.subscribe((data) => data);
        } else if (title === 'Profile') {
            console.log('click profile');
            const dialogRef = this.dialog
                .open(ProfileComponent, {
                    context: { employeeId: this.auth.getTokenUserID() },
                })
                .onClose.subscribe((data) => data);
        }
    }
}
