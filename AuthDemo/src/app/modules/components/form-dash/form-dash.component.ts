import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WidgetService } from 'src/app/services/dashboard.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form-dash',
  templateUrl: './form-dash.component.html',
  styleUrls: ['./form-dash.component.scss'],
})
export class FormDashComponent {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private widgetService: WidgetService,
    private _snackBar: MatSnackBar
  ) {}
  form: FormGroup;
  @Input() editId: any;
  editPayload: any;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      desc: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      widgets: [],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  // Submit user form details to backend
  onSubmit(): void {
    if (!this.editId) {
      // If editId not exist then creating user
      this.widgetService.create(this.form.value).subscribe({
        next: (result) => {
          this.router.navigate(['dashboards']); //navigate to login page or componenent
          this._snackBar.open('Dashboard created.', 'Dismiss', {
            duration: 3000,
          });
        },
        error: (response) => {
          let errorMsg = response.error.message;
          this._snackBar.open(errorMsg, 'Dismiss', {
            duration: 3000,
          });
        },
      });
    } else {
      // If editId  exist then updating existing user

      this.widgetService
        .updateDashById(this.form.value, this.editId)
        .subscribe({
          next: (result) => {
            this.router.navigate(['/dashboards']); //navigate to login page or componenent
            this._snackBar.open('Dashboard updated.', 'Dismiss', {
              duration: 3000,
            });
          },
          error: (response) => {
            let errorMsg = response.error.message;
            this._snackBar.open(errorMsg, 'Dismiss', {
              duration: 3000,
            });
          },
        });
    }
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    if (this.editId) {
      this.widgetService.getById(this.editId).subscribe((response: any) => {
        this.form.patchValue(response);
      });
    }
  }
}
