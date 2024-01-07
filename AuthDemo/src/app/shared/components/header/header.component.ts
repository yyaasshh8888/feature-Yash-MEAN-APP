import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HelperCacheService } from '../../services/helper.cache.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  user: any = {};

  constructor(
    private router: Router,
    public us: UserService,
    private helperCache: HelperCacheService
  ) {}

  ngOnInit() {
    this.us.getUserProfile().subscribe(
      (res: any) => {
        this.user = res.user;
        this.helperCache.setActiveUser(this.user);
      },
      (err: any) => {
        alert(err.error.message);
      }
    );
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
  logOut() {
    this.us.resetToken();
    this.router.navigateByUrl('signin');
  }
}
