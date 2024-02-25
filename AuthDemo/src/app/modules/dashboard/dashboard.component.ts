import { Component, OnInit } from '@angular/core';
import { HelperCacheService } from 'src/app/shared/services/helper.cache.service';
import { WidgetService } from '../../services/dashboard.service';

import { GridType, GridsterConfig, GridsterItem } from 'angular-gridster2';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashId: any;
  dashboardDetails: any;
  constructor(
    public helperCache: HelperCacheService,
    private widgetService: WidgetService,
    private loaderService: LoaderService,
    private _snackBar: MatSnackBar,
    private _route: ActivatedRoute
  ) {
    this.getDashboardId();
  }

  options: GridsterConfig;
  widgets: Array<GridsterItem> = [];

  ngOnInit() {
    this.loadGridsterOptions();
    this.loadWidgets();
  }
  getDashboardId() {
    this.loaderService.start();
    this._route.params.subscribe((param) => {
      this.dashId = param['dashId'];
    });
  }
  loadWidgets() {
    if (this.dashId)
      this.widgetService.getById(this.dashId).subscribe((res: any) => {
        this.dashboardDetails = res;
        this.widgets = res?.widgets?.length ? res?.widgets : [];
        this.loaderService.stop();
      });
  }
  loadGridsterOptions() {
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
  }
  onGridsterChange(resize: any) {
    if (resize?.item?._id) {
      let updateWidget = {
        ...resize?.item,
        dashId: this.dashId,
      };
      this.widgetService
        .updateWidgetById(updateWidget, resize?.item?._id)
        .subscribe((res: any) => {
          this._snackBar.open('Widget updated successfully.', 'OK', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        });
    } else {
      let newWidget = {
        ...resize?.item,
        dashId: this.dashId,
      };
      this.widgetService.createNewWidget(newWidget).subscribe((res: any) => {
        this._snackBar.open('Widget created successfully.', 'OK', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.loadWidgets();
      });
    }
  }

  changedOptions() {
    this.options.api.optionsChanged();
  }

  removeItem(item) {
    this.widgets.splice(this.widgets.indexOf(item), 1);
  }

  addItem() {
    this.widgets.push({ name: 'Widget' + this.widgets?.length } as any);
  }
  deleteWidget(widget: any) {
    if (widget?._id)
      this.widgetService.deleteWidget(widget._id).subscribe((res: any) => {
        this.loadWidgets();
      });
  }
}
