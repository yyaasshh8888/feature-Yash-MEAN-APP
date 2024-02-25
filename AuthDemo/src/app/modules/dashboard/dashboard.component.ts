import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HelperCacheService } from 'src/app/shared/services/helper.cache.service';
import { WidgetService } from '../../services/dashboard.service';

import {
  DisplayGrid,
  GridType,
  GridsterConfig,
  GridsterItem,
} from 'angular-gridster2';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    public helperCache: HelperCacheService,
    private widgetService: WidgetService,
    private loaderService: LoaderService,
    private _snackBar: MatSnackBar
  ) {}

  options: GridsterConfig;
  dashboard: Array<GridsterItem> = [];

  ngOnInit() {
    this.loaderService.start();
    this.options = {
      gridType: GridType.Fit,
      displayGrid: 'onDrag&Resize',
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
        dragHandleClass: 'drag-handler',
        ignoreContentClass: 'gridster-item-content',
        ignoreContent: true,
      },
      resizable: {
        enabled: true,
      },
      swap: false,
      pushItems: true,
    };

    this.widgetService.getWidgetsList().subscribe((response: any) => {
      this.dashboard = response?.list?.map((x) => x);
      this.loaderService.stop();
    });
  }
  onGridsterChange(resize: any) {
    if (resize?.item?._id)
      this.widgetService
        .updateWidgetById(resize?.item, resize?.item?._id)
        .subscribe((res: any) => {
          this._snackBar.open('Widget updated successfully.', 'OK', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        });
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
