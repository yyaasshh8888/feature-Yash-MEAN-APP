import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HelperCacheService } from 'src/app/shared/services/helper.cache.service';
import { WidgetService } from '../../services/dashboard.service';

import {
  DisplayGrid,
  GridType,
  GridsterConfig,
  GridsterItem,
} from 'angular-gridster2';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    public helperCache: HelperCacheService,
    private widgetService: WidgetService,
    private changeDetector: ChangeDetectorRef
  ) {}

  options: GridsterConfig;
  dashboard: Array<GridsterItem> = [];

  ngOnInit() {
    this.options = {
      gridType: GridType.Fit,
      displayGrid: DisplayGrid.Always,
      disableWindowResize: false,
      scrollToNewItems: false,
      disableWarnings: false,
      ignoreMarginInRow: false,
      minCols: 10,
      maxCols: 10,
      minRows: 8,
      maxRows: 8,
      draggable: {
        enabled: true,
        dragHandleClass: 'drag-handle',
        ignoreContentClass: 'gridster-item-content',
      },
      resizable: {
        enabled: true,
      },
      swap: false,
      pushItems: true,
    };

    this.widgetService.getWidgetsList().subscribe((response: any) => {
      this.dashboard = response?.list?.map((x) => x);
    });
  }
  onGridsterChange(resize: any) {
    if (resize?.item?._id)
      this.widgetService
        .updateWidgetById(resize?.item, resize?.item?._id)
        .subscribe((res: any) => {});
  }

  changedOptions() {
    this.options.api.optionsChanged();
  }

  removeItem(item) {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem() {
    this.dashboard.push({} as any);
  }
}
