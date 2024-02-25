import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-dash',
  templateUrl: './edit-dash.component.html',
  styleUrls: ['./edit-dash.component.scss'],
})
export class EditDashComponent {
  editId;
  editPayload: any;
  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.params.subscribe((param) => {
      this.editId = param['dashId'];
    });
  }
}
