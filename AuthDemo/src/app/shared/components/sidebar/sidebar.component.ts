import { Component, OnInit } from '@angular/core';
import { menus } from '../../menu.config';
import { HelperService } from '../../services/helper.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menus = menus;
  constructor(private helper: HelperService) {}

  ngOnInit(): void {}

  setTitle(title: string) {
    this.helper.setTitle(title);
  }
}
