import { Component } from '@angular/core';
import { HelperCacheService } from 'src/app/shared/services/helper.cache.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(public helperCache: HelperCacheService) {}

  ngOnInit() {}
}
