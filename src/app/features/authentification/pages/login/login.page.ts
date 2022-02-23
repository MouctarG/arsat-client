import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth';
import { environment } from '../../../../../environments/environment';
import { LoginService } from '../../services/login.service';

@Component({
  template: `
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <input type="text" id="login" class="fadeIn second" name="username" placeholder="Utilisateur" [formControlName]="'username'">
          <input type="password" id="password" class="fadeIn third" name="password" placeholder="Mot de passe" [formControlName]="'password'">
          <input type="submit" class="fadeIn fourth" value="Log In">
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./login.page.css']
})
export class LoginPage implements OnInit {
  backgroundClass: string;

  form = this.formBuilder.group({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    remember: new FormControl(false)
  });

  private loading = false;

  // Clé de stockage du username dans le localStorage
  private readonly LOGIN_USERNAME_KEY = 'login.username';

  constructor(private formBuilder: FormBuilder, private login: LoginService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth.logout();

    this.backgroundClass = `bg-${Math.floor(Math.random() * 5) + 1}`;

    // Récupération du nom d'utilisateur enregistré lors de la dernière connexion
    const username = localStorage.getItem(this.LOGIN_USERNAME_KEY);
    if (username !== null) {
      this.form.setValue({
        username,
        password: '',
        remember: true
      });
    }
  }

  onSubmit(): void {
    if (this.loading) {
      return;
    }

    this.loading = true;

    const { username, password, remember } = this.form.value;

    if (remember) {
      localStorage.setItem(this.LOGIN_USERNAME_KEY, username);
    } else {
      localStorage.removeItem(this.LOGIN_USERNAME_KEY);
    }

    this.login.login({ username, password }).subscribe(
      () => {
        this.router.navigate([environment.router.home]);
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        throw error;
      });
  }
}
