import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { WidgetService } from 'src/app/services/dashboard.service';
declare var require: any;

const swal = require('sweetalert');

@Component({
  selector: 'app-list-dashboard',
  templateUrl: './list-dashboard.component.html',
  styleUrls: ['./list-dashboard.component.scss'],
})
export class ListDashboardComponent {
  dataSource: MatTableDataSource<[]> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('myTable') table: MatTable<any>;
  pageSizeOptions: Array<number> = [5, 10, 20];
  displayedColumns: Array<string> = [];
  isLoading: boolean;
  constructor(private ws: WidgetService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.displayedColumns = ['name', 'desc', 'created', 'Actions'];
    this.ws.getDashboardsList().subscribe((response: any) => {
      this.dataSource.data = response.list;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  sortTable(event: Event): void {
    this.table.renderRows();
  }

  delete(Id, index) {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover.',
      icon: 'warning',
      buttons: {
        cancel: true,
        confirm: {
          text: 'Yes',
          value: true,
          visible: true,
          className: 'bg-danger',
          closeModal: true,
        },
      },
    }).then((isConfirm) => {
      if (isConfirm) {
        this.ws.delete(Id).subscribe(
          (data: any) => {
            this.dataSource.data.splice(index, 1);
            this.dataSource.paginator = this.paginator;
            swal('Deleted!', 'Dashboard has been deleted.', 'success');
          },
          (err) => {}
        );
      } else {
        swal('Cancelled', '', 'error');
      }
    });
  }
}
