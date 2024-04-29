/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
    NbChatModule,
    NbDatepickerModule,
    NbDialogModule,
    NbMenuModule,
    NbSidebarModule,
    NbToastrModule,
    NbWindowModule,
} from '@nebular/theme';
import { AuthModule } from '@auth0/auth0-angular';
import { AdminModule } from './admin/admin.module';
import { JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { SharedModule } from './shared/shared.module';

export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        NbSidebarModule.forRoot(),
        NbMenuModule.forRoot(),
        NbDatepickerModule.forRoot(),
        NbDialogModule.forRoot(),
        NbWindowModule.forRoot(),
        NbToastrModule.forRoot(),
        NbChatModule.forRoot({
            messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
        }),
        CoreModule.forRoot(),
        ThemeModule.forRoot(),
        AuthModule.forRoot({
            domain: 'dev-hte6ekrcmpejgmww.au.auth0.com',
            clientId: '1xT8bxpAJiFp5lD3rR76HD1I8wVm3t01',
            authorizationParams: {
                redirect_uri: window.location.origin,
            },
            useRefreshTokens: true,
            useRefreshTokensFallback: false,
            cacheLocation: 'localstorage',
        }),
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
            },
        }),
        // AdminModule,
        SharedModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
