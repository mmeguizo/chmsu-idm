import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { ThemeModule } from '../@theme/theme.module';
import { NbSpinnerModule } from '@nebular/theme';
import { NbCardModule, NbButtonModule } from '@nebular/theme';
import { NbLayoutModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ThemeModule,
    NbSpinnerModule,
    NbCardModule,
    NbLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
