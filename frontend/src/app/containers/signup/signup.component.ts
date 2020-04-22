import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    public userService: UserService,
    private router: Router,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
  }
  signup(signupForm: NgForm) {
    if (signupForm.controls.password.errors?.pattern) {
      return this.notification.warning('Wrong password', 'Your password must contain at least a lowercase letter, a uppercase letter, a number, and must be between 8 and 40 characters')
    }
    if (signupForm.valid) {
      this.userService.signup(signupForm.value)
        .subscribe(res => {
          this.notification.success('User created', 'User successfully created', { nzDuration: 2000 });
          setTimeout(() => this.router.navigate(['/login']), 2000);
        });
    }
  }
}
