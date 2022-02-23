import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// EJ2
import { ProgressButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { CheckBoxModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';

import { LoginPage } from './pages/login/login.page';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LogoutPage } from './pages/logout/logout.page';

@NgModule({
  declarations: [
    LoginPage,
    LoginFormComponent,
    LogoutPage
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ProgressButtonModule,
    CheckBoxModule,
    ButtonModule,
    TextBoxAllModule
  ]
})
export class AuthentificationModule { }
