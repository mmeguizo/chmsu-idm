import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConnectionService } from './connection.service';
import { AuthServices } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    public authToken;
    public options;
    picture: HttpHeaders;

    constructor(
        public auth: AuthServices,
        public cs: ConnectionService,
        private http: HttpClient
    ) {
        this.getAllUsers();
    }

    createAuthenticationHeaders() {
        this.loadToken();
        this.options = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'image/jpeg',
            authorization: `Bearer ${this.authToken}`, //this.authToken,
        });
    }

    loadToken() {
        const token = localStorage.getItem('token');
        this.authToken = token;
    }

    getUser(id: any) {
        this.createAuthenticationHeaders();
        return this.http.post(
            this.cs.domain + `/users/getUser`,
            { id: id },
            {
                headers: this.options,
            }
        );
    }

    getUsers(id: any) {
        this.createAuthenticationHeaders();
        return this.http.get(this.cs.domain + `/users/getUsers/${id}`, {
            headers: this.options,
        });
    }
    updateProfile(data: any) {
        this.createAuthenticationHeaders();
        return this.http.put(this.cs.domain + `/users/updateProfile`, data, {
            headers: this.options,
        });
    }

    getAllUsers() {
        this.createAuthenticationHeaders();
        return this.http.get(this.cs.domain + '/users/getAllUser', {
            headers: this.options,
        });
    }

    getUserProfilePic(data) {
        this.createAuthenticationHeaders();
        this.picture = new HttpHeaders({
            // 'Accept': 'image/jpeg',
            'Content-Type': 'application/octet-stream',
            authorization: this.authToken,
        });
        return this.http.get(this.cs.domain + '/users/UserProfilePic/' + data, {
            headers: this.picture,
            responseType: 'blob',
        });
    }
}
