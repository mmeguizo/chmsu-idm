import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AuthServices } from '../../@core/services/auth.service';

@Component({
    selector: 'ngx-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    profileJson: string = null;
    constructor(
        public auth: AuthService,
        public user: AuthServices
    ) {}

    async ngOnInit() {
        console.log('dashboard component');

        const user = await this.auth.isAuthenticated$;
        const userData = await this.auth.user$;
        console.log({ user: user });
        console.log({ userData: userData });
    }
}
