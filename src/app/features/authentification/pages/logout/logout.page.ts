import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  template: ``
})
export class LogoutPage implements OnInit {

  constructor(private login: LoginService) { }

  ngOnInit(): void {

    // Logout
    this.login.logout();

  }

}
