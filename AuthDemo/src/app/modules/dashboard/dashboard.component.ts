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
    this._route.params.subscribe((param) => {
      this.dashId = param['dashId'];
    });
  }
  loadWidgets() {
    if (this.dashId) {
      this.loaderService.start();
      this.widgetService.getById(this.dashId).subscribe((res: any) => {
        this.dashboardDetails = res;
        this.widgets = res?.widgets?.length ? res?.widgets : [];
        this.loaderService.stop();
      });
    }
  }
  loadGridsterOptions() {
    this.options = {
      gridType: GridType.Fit,
      displayGrid: 'onDrag&Resize',
      disableWindowResize: false,
      scrollToNewItems: false,
      disableWarnings: true,
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
      swap: true,
      pushItems: false,
    };
  }
  onGridsterChange(resize: any) {
    if (resize?.item?._id) {
      this.updateExistingWidget(resize);
    } else {
      this.createNewWidget(resize);
    }
  }
  /**
   * To create a new widget entry in DB
   * @param currentWidget => Newly created widget config data
   */
  createNewWidget(currentWidget: any) {
    let newWidget = {
      ...currentWidget?.item,
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
  /**
   * To persist the widget dimensions in DB for an existing widget
   * @param existingWidget => Existing widget data
   */
  updateExistingWidget(existingWidget: any) {
    let updateWidget = {
      ...existingWidget?.item,
      dashId: this.dashId,
    };
    this.widgetService
      .updateWidgetById(updateWidget, existingWidget?.item?._id)
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

  addItem() {
    this.widgets.push({
      name: 'Widget' + ' ' + Number(this.widgets?.length + 1),
    } as any);
  }
  deleteWidget(widget: any, existingIndex: any) {
    if (widget?._id) {
      this.widgetService.deleteWidget(widget._id).subscribe((res: any) => {
        if (existingIndex >= 0) {
          this.widgets.splice(existingIndex, 1);
        }
      });
    }
  }
  // CleanUp
  ngOnDestroy() {
    this._snackBar?.dismiss();
  }
}
