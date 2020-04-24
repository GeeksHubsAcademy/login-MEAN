import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public userService: UserService,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  logout() {
    const token = localStorage.getItem('authToken');
    this.userService.logout(token)
      .subscribe(
        (res: User) => {
          this.notification.success('LOGOUT', 'Successfully logged out');
          localStorage.removeItem('authToken');
          this.userService.setUser(null);
          this.router.navigate(['']);
        }, (error: HttpErrorResponse) => {
          console.error(error);
          this.notification.error('Wrong Logout', 'There was a problem trying to log out');
        }
      )
  }
}
