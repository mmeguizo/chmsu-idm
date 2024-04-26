import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { AuthServices } from '../@core/services/auth.service';

// import { AuthService } from '../@core/services/auth.service';
// import { ConnectionService } from '../@core/services/connection.service';
import { jwtDecode } from 'jwt-decode';
import { UserToken } from '../@core/data/user-token';

@Component({
    selector: 'ngx-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    username: String;
    password: String;
    msg: String;
    loader = false;
    disableSubmit;
    conn;
    userID;

    messageClass;
    message;
    processing = false;
    form: FormGroup;

    profileJson: string = null;

    constructor(
        // public cs: ConnectionService,
        private formBuilder: FormBuilder,
        // private authService: AuthService,
        private router: Router,
        public auth: AuthService,
        public user: AuthServices
    ) {
        // this.createForm();
    }

    async ngOnInit() {
        this.createForm();
        await this.auth.handleRedirectCallback();
        // console.log({ login: 'login component' });
        // console.log(window.location.origin);
    }

    // loginWithRedirect() {
    //     console.log(this.auth);
    //     this.user.loginWithRedirect();
    //     this.user.loginWithRedirect();
    //     this.auth.loginWithRedirect({
    //         appState: { target: '/admin' },
    //     });
    // }

    createForm() {
        console.log({ login: 'login form' });

        this.form = this.formBuilder.group({
            username: ['', Validators.required], // Username field
            password: ['', Validators.required], // Password field
        });
    }

    enableForm() {
        this.form.controls['username'].enable(); // Enable username field
        this.form.controls['password'].enable(); // Enable password field
    }

    disableForm() {
        this.form.controls['username'].disable(); // Disable username field
        this.form.controls['password'].disable(); // Disable password field
    }
    Submit() {
        const user = {
            username: this.username,
            password: this.password,
        };
    }
    // // Functiont to submit form and login user
    onLoginSubmit() {
        this.processing = true; // Used to submit button while is being processed
        this.disableForm(); // Disable form while being process
        const user = {
            username: this.form.get('username').value, // Username input field
            password: this.form.get('password').value, // Password input field
        };

        // Function to send login data to API
        this.user.login(user).subscribe((token: any) => {
            let decoded = jwtDecode<UserToken>(token.token);

            console.log({ token: token });
            console.log({ decoded: decoded });

            // Check if response was a success or error
            if (!token.success) {
                this.user.makeToast(
                    'danger',
                    'Failed Logging in',
                    token.message
                );
                this.processing = false; // Enable submit button
                this.enableForm(); // Enable form for editting
            } else {
                this.user.makeToast('success', 'Success', token.message);
                this.user.storeUserData(token.token, decoded);
                if (this.user.CurrentlyloggedIn()) {
                    this.user.loggingIn(decoded.role);
                } else {
                    this.user.logout();
                    this.router.navigate(['login']); // Navigate to dashboard view
                }
            }
        });
    }

    async loginWithRedirect() {
        this.auth.loginWithRedirect({
            appState: { target: '/admin' },
        });
        // const user = await this.auth.isAuthenticated$;
        // const userData = await this.auth.user$;
        // console.log({ user: user });
        // console.log({ userData: userData });
    }
}
