import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {
  recoverToken: string;
  constructor(
    private route: ActivatedRoute,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.recoverToken = this.route.snapshot.params.recoverToken;
  }
  resetPassword(password) {
    this.userService.resetPassword(password, this.recoverToken)
  }
}
