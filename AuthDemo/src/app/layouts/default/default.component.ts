import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';
@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  sideBarClosed = true;

  constructor(public loaderService: LoaderService) {}

  ngOnInit() {}

  sideBarToggler() {
    this.sideBarClosed = !this.sideBarClosed;
  }
}
