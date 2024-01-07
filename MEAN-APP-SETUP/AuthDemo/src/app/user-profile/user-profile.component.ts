import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  constructor(private router: Router, private us: UserService) {}
  user: any = {};
  ngOnInit(): void {
    this.us.getUserProfile().subscribe(
      (res) => {
        this.user = res;
      },
      (err: any) => {
        alert(err.error.message);
      }
    );
  }
  logOut() {
    this.us.resetToken();
    this.router.navigateByUrl('signin');
  }
}
