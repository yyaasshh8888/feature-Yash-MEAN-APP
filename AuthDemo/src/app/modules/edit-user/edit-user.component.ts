import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  userId;
  editPayload: any;
  constructor(
    private _route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((param) => {
      this.userId = param['userId'];
    });
  }
}
