import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
//map is not working if not imported
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ConnectionService } from './connection.service';
import { jwtDecode } from 'jwt-decode';
// import { UserToken } from '../@core/data/user-token';
import { UserToken } from '../data/user-token';

import {
    NbComponentStatus,
    NbGlobalLogicalPosition,
    NbGlobalPhysicalPosition,
    NbGlobalPosition,
    NbToastrService,
    NbToastrConfig,
} from '@nebular/theme';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public domain;
    authToken;
    user;
    public options;
    fulluserloggedData: {};
    public socketserver: any = { status: true, message: 'online' };
    private decoded: UserToken;

    config: NbToastrConfig;

    index = 1;
    destroyByClick = true;
    duration = 2000;
    hasIcon = true;
    position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    preventDuplicates = false;
    status: NbComponentStatus = 'primary';

    title = 'HI there!';
    content = `I'm cool toaster!`;

    types: NbComponentStatus[] = [
        'primary',
        'success',
        'info',
        'warning',
        'danger',
    ];
    positions: string[] = [
        NbGlobalPhysicalPosition.TOP_RIGHT,
        NbGlobalPhysicalPosition.TOP_LEFT,
        NbGlobalPhysicalPosition.BOTTOM_LEFT,
        NbGlobalPhysicalPosition.BOTTOM_RIGHT,
        NbGlobalLogicalPosition.TOP_END,
        NbGlobalLogicalPosition.TOP_START,
        NbGlobalLogicalPosition.BOTTOM_END,
        NbGlobalLogicalPosition.BOTTOM_START,
    ];

    constructor(
        private router: Router,
        public connection: ConnectionService,
        public location: Location,
        private http: HttpClient,
        public jwtHelper: JwtHelperService,
        public toasted: NbToastrService,
        private toastrService: NbToastrService
    ) {
        this.domain = this.connection.domain;
    }

    public Notifytoast(
        status: NbComponentStatus,
        body,
        title,
        duration,
        position
    ) {
        this.toasted.show(body, title, { status, duration, position });
    }

    handleError(error: HttpErrorResponse) {
        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }

    createAuthenticationHeaders() {
        this.loadToken();
        this.options = new HttpHeaders({
            'Content-Type': 'application/json',
            authorization: this.authToken,
        });
    }

    loadToken() {
        const token = localStorage.getItem('token');
        this.authToken = token;
    }

    loadFullData() {
        let data = [];
        try {
            data.push(JSON.parse(localStorage.getItem('fulluserloggedData')));
        } catch (ex) {
            console.error(ex);
        }
        return data;
    }

    registerUser(user) {
        // return this.http.post('/authentication/register', user)
        return this.http.post(this.domain + '/authentication/register', user);
    }

    checkUsername(username) {
        // return this.http.get('/authentication/checkUsername/' + username);
        return this.http.get(
            this.domain + '/authentication/checkUsername/' + username
        );
    }

    checkEmail(email) {
        // return this.http.get('/authentication/checkEmail/' + email)
        return this.http.get(
            this.domain + '/authentication/checkEmail/' + email
        );
    }

    // Function to login user
    login(user) {
        // return this.http.post('/authentication/login', user)
        return this.http.post(this.domain + '/authentication/login', user);
    }

    logout() {
        this.authToken = null;
        this.user = null;
        this.fulluserloggedData = null;
        localStorage.clear();
        this.router.navigate(['login']);
    }

    CurrentlyloggedIn() {
        const token = this.authToken;
        return !this.jwtHelper.isTokenExpired(token);
    }
    public loggingIn(role) {
        setTimeout(() => {
            this.router.navigate([role]); // Navigate to dashboard view
        }, 500);
        // this.router.navigate([this.getTokenData('role')]);
    }

    // Function to store user's data in client local storage
    storeUserData(token, user) {
        localStorage.setItem('token', token); // Set token in local storage
        this.authToken = token; // Assign token to be used elsewhere
        this.fulluserloggedData = user; // Set user to be used elsewhere
    }

    getTokenUsername() {
        return jwtDecode<UserToken>(localStorage.getItem('token')).username;
    }
    getTokenUserID() {
        return jwtDecode<UserToken>(localStorage.getItem('token')).id;
    }
    getUserProfilePic() {
        return jwtDecode<UserToken>(localStorage.getItem('token')).profile_pic;
    }

    getUserRole() {
        return jwtDecode<UserToken>(localStorage.getItem('token')).role;
    }

    getProfile() {
        //this.options => is not working but with {headers : this.options} is working i read it i guess in angular docs
        //'@auth0/angular-jwt'; is adding 'Bearer ' in token so i removed it manually
        this.createAuthenticationHeaders();
        //return this.http.get('/authentication/profile', { headers: this.options })
        return this.http.get(this.domain + '/authentication/profile', {
            headers: this.options,
        });
    }

    getPublicProfile(username) {
        this.createAuthenticationHeaders(); // Create headers before sending to API
        // return this.http.get('/authentication/publicProfile/' + username, { headers: this.options });
        return this.http.get(
            this.domain + 'authentication/publicProfile/' + username,
            { headers: this.options }
        );
    }

    public back() {
        this.location.back();
    }

    makeToast(status, title, content) {
        this.showToast(status, title, content);
    }

    private showToast(type: NbComponentStatus, title: string, body: string) {
        const config = {
            status: type,
            destroyByClick: this.destroyByClick,
            duration: this.duration,
            hasIcon: this.hasIcon,
            position: this.position,
            preventDuplicates: this.preventDuplicates,
        };
        const titleContent = title ? `${title}` : '';

        this.index += 1;
        this.toastrService.show(body, `${titleContent}`, config);
    }
}
