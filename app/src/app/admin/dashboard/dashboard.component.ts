import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { authService } from '../../@core/services/auth.service';

@Component({
    selector: 'ngx-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    profileJson: string = null;
    constructor(
        public auth: AuthService,
        public user: authService
    ) {
        this.auth.user$.subscribe(
            (profile) => (this.profileJson = JSON.stringify(profile, null, 2))
        );
        console.log(JSON.parse(this.profileJson));
    }

    ngOnInit() {
        console.log(JSON.parse(this.profileJson));
        console.log(this.user.getUserFromLocalStorage());
    }
}
