import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  sideBarClosed = true;

  constructor() {}

  ngOnInit() {}

  sideBarToggler() {
    this.sideBarClosed = !this.sideBarClosed;
  }
}
