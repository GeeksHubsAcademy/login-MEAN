import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public userService: UserService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
  }
  login(loginForm: NgForm) {
    if (!loginForm.valid) {
      console.log(loginForm)
      return this.notification.error('Invalid Form', 'There are some wrong fields');
    }
    this.userService.login(loginForm.value)
      .subscribe((res: HttpResponse<object>) => {
        /* tslint:disable:no-string-literal */
        this.notification.success('Successfully Login', res['message']);
        localStorage.setItem('authToken', res['token']);
        this.userService.setUser(res['user']);
      },
        (error: HttpErrorResponse) => {
          console.error(error);
          
        this.notification.error('Wrong Login', 'There was a problem trying to log in');
        });
  }
}