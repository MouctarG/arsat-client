import {AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {ProgressButtonComponent} from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  selector: 'app-login-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="e-input-group e-float-icon-left" [ngClass]="{ 'e-error': submitted && username !== null && username.errors }">
        <i class="e-input-group-icon far fa-user"></i>
        <ejs-textbox class="input" formControlName="username" type="text" autocomplete="off" floatLabelType="Auto" i18n-placeholder="@@authentification.login.username" placeholder="Nom d'utilisateur"></ejs-textbox>
      </div>

      <div *ngIf="submitted && username && username.errors">
        <div *ngIf="username.errors.required" i18n="@@form.error.required" class="e-error text-center">
          Ce champ est obligatoire
        </div>
      </div>

      <div class="e-input-group e-float-icon-left" [ngClass]="{ 'e-error': submitted && password !==null && password.errors }">
        <i class="e-input-group-icon fas fa-key"></i>
        <ejs-textbox class="input" formControlName="password" type="password" autocomplete="off" floatLabelType="Auto" i18n-placeholder="@@authentification.login.password" placeholder="Mot de passe"></ejs-textbox>
      </div>

      <div *ngIf="submitted && password && password.errors">
        <div *ngIf="password.errors.required" i18n="@@form.error.required" class="e-error text-center">
          Ce champ est obligatoire
        </div>
      </div>


      <div class="input-group form-group text-center">
        <ejs-checkbox formControlName="remember" i18n-label="@@authentification.login.remember" label="Se souvenir de mon identifiant" style="margin: 0 auto;"></ejs-checkbox>
      </div>

      <div class="text-center">
        <button #progressBtn [isPrimary]="true" ejs-progressbutton i18n-content="Bouton de connexion@@authentification.login.button" content="Connexion" type="submit" [duration]="60000"></button>
      </div>

    </form>
  `,
  styleUrls: ['./login-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit, AfterViewInit {

  @Input() form: FormGroup;
  @Output() formSubmit = new EventEmitter<{ button?: ProgressButtonComponent }>();

  @ViewChild('progressBtn')
  private progressBtn: ProgressButtonComponent;

  submitted = false;

  get username(): AbstractControl | null { return this.form.get('username'); }
  get password(): AbstractControl | null { return this.form.get('password'); }

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void { }

  onSubmit(): void {
    this.submitted = true;

    this.formSubmit.emit({ button: this.progressBtn });
  }

}
