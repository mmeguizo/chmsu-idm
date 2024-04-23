import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createAuth0Client } from '@auth0/auth0-spa-js';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
    providedIn: 'root',
})
export class authService {
    user: any;
    constructor(
        private router: Router,
        private auth0Client: AuthService
    ) {
        // this.initAuth0Client();
    }

    async loginWithRedirect() {
        await this.auth0Client.loginWithRedirect({
            appState: { target: '/admin' },
        });
        const user = await this.auth0Client.getAccessTokenSilently();
        this.user = user;
        this.saveUserToLocalStorage(user);
    }

    saveUserToLocalStorage(user: any) {
        // localStorage.setItem('user', JSON.stringify(user));
        return user;
    }

    getUserFromLocalStorage() {
        console.log(this.user);

        return this.auth0Client.user$;
        // return JSON.parse(localStorage.getItem('user'));
    }
}
