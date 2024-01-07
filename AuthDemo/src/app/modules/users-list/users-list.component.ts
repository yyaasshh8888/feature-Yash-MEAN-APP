import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
declare var require: any;

const swal = require('sweetalert');

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  dataSource: MatTableDataSource<[]> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('myTable') table: MatTable<any>;
  pageSizeOptions: Array<number> = [5, 10, 20];
  displayedColumns: Array<string> = [];
  isLoading: boolean;
  constructor(private us: UserService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.displayedColumns = ['username', 'email', 'created', 'Actions'];
    this.us.getUserList().subscribe((response: any) => {
      this.dataSource.data = response.users;
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

  deleteUser(userId, index) {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user.',
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
        this.us.deleteUser(userId).subscribe(
          (data: any) => {
            this.dataSource.data.splice(index, 1);
            this.dataSource.paginator = this.paginator;
            swal('Deleted!', 'User has been deleted.', 'success');
          },
          (err) => {}
        );
      } else {
        swal('Cancelled', '', 'error');
      }
    });
  }
}
