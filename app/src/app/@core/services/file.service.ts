import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConnectionService } from './connection.service';
import { AuthServices } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class FileService {
    public authToken;
    public options;

    constructor(
        public auth: AuthServices,
        public cs: ConnectionService,
        private http: HttpClient
    ) {
        //this.getAllUsers();
    }

    createAuthenticationHeaders() {
        this.loadToken();
        this.options = new HttpHeaders({
            // 'Content-Type': 'application/json',
            Accept: 'image/jpeg',
            authorization: this.authToken,
        });
    }

    loadToken() {
        const token = localStorage.getItem('token');
        this.authToken = token;
    }

    addFile(form, id = null) {
        this.createAuthenticationHeaders();

        console.log(form);

        return this.http.post(
            this.cs.domain + `/fileupload/addFile/${id}`,
            form,
            { headers: this.options, responseType: 'json' }
        );
    }

    addAvatar(data) {
        this.createAuthenticationHeaders();
        return this.http.post(this.cs.domain + '/fileupload/addAvatar', data, {
            headers: this.options,
            responseType: 'json',
        });
    }

    deleteFile(data) {
        this.createAuthenticationHeaders();
        return this.http.post(this.cs.domain + '/fileupload/deleteFile', data, {
            headers: this.options,
            responseType: 'json',
        });
    }

    getAllFiles(id) {
        this.createAuthenticationHeaders();
        return this.http.get(this.cs.domain + `/fileupload/getAllFiles/${id}`, {
            headers: this.options,
            responseType: 'json',
        });
    }

    getRoute(endpoint, apiName, data) {
        this.createAuthenticationHeaders();
        if (endpoint == 'put') {
            return this.http.put(
                this.cs.domain + `/fileupload/${apiName}`,
                data,
                { headers: this.options }
            );
        } else if (endpoint == 'post') {
            return this.http.post(
                this.cs.domain + `/fileupload/${apiName}`,
                data,
                { headers: this.options }
            );
        } else {
            return this.http.get(this.cs.domain + `/fileupload/${apiName}`, {
                headers: this.options,
            });
        }
    }
}
