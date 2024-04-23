import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import {
    NbMediaBreakpointsService,
    NbMenuService,
    NbSidebarService,
    NbThemeService,
} from '@nebular/theme';
import { AuthService } from '@auth0/auth0-angular';
import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
// import { AuthService } from '../../../@core/services/auth.service';

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

    currentTheme = 'default';

    userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

    private _user: any = null;
    private _isAuthenticated: boolean = false;
    private _token: any = null;

    profileJson: string = null;

    constructor(
        private sidebarService: NbSidebarService,
        private menuService: NbMenuService,
        private themeService: NbThemeService,
        private userService: UserData,
        private layoutService: LayoutService,
        private breakpointService: NbMediaBreakpointsService,
        public auth: AuthService,
        @Inject(DOCUMENT) private doc: Document
    ) {
        console.log(this.auth.user$);
    }

    ngOnInit() {
        this.currentTheme = this.themeService.currentTheme;

        this.userService
            .getUsers()
            .pipe(takeUntil(this.destroy$))
            .subscribe((users: any) => (this.user = users.nick));

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
            .subscribe((themeName) => (this.currentTheme = themeName));

        this.auth.user$.subscribe(
            (profile) => (this.profileJson = JSON.stringify(profile, null, 2))
        );
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    changeTheme(themeName: string) {
        this.themeService.changeTheme(themeName);
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
}
