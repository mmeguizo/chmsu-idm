import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import {
    NbMediaBreakpointsService,
    NbMenuService,
    NbSidebarService,
    NbThemeService,
} from '@nebular/theme';
// import { AuthService } from '@auth0/auth0-angular';
import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../../../@core/services/auth.service';

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

    constructor(
        private sidebarService: NbSidebarService,
        private menuService: NbMenuService,
        private themeService: NbThemeService,
        private userService: UserData,
        private layoutService: LayoutService,
        public auth: AuthService,
        private breakpointService: NbMediaBreakpointsService,
        @Inject(DOCUMENT) private doc: Document
    ) {
        const savedTheme = this.getCurrentTheme();
        if (savedTheme) {
            this.setThemeStyle(savedTheme);
        }
    }

    ngOnInit() {
        this.currentTheme = this.themeService.currentTheme;

        this.userService
            .getUsers()
            .pipe(takeUntil(this.destroy$))
            .subscribe((users: any) => (this.user = users.nick));

        this.menuService.onItemClick().subscribe((event) => {
            //boolean content init will stop the subscribed data from multiplying which cause incremental event
            if (this.contentInit == false) {
                this.onItemSelection(event.item.title);
            }
        });

        this.name = this.auth.getTokenUsername();
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

    onItemSelection(title) {
        if (title === 'Log out') {
            console.log('clikc logout');

            // const activeModal = this.ngbModal.open(CommonComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height', backdrop: 'static' });
            // activeModal.componentInstance.headerTitle = 'Logout',
            // activeModal.componentInstance.bodyContent ='Are you sure you want to logout?',
            // activeModal.componentInstance.username = this.name
        } else if (title === 'Profile') {
            console.log('click profile');

            // const activeModal = this.ngbModal.open(UpdateProfileComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height', backdrop: 'static' });
        }
    }
}
