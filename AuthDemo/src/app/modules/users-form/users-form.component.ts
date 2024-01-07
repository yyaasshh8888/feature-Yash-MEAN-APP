import { CustomValidators } from './../../shared/custom-validators';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
})
export class UsersFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  userform: FormGroup;
  @Input() userId: any;
  editPayload: any;
  paswdProfile: IPasswordProfile = {
    minChar: 8,
    numbers: 1,
    upperCase: 1,
    lowerCase: 1,
    specialChar: 1,
    maxPasswordAge: 90,
    uniqueness: 5,
  };

  ngOnInit(): void {
    this.userform = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        password: [
          null,
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            CustomValidators.patternValidator(
              /[0-9]/g,
              this.paswdProfile.numbers,
              {
                hasNumber: true,
              }
            ),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(
              /[A-Z]/g,
              this.paswdProfile.upperCase,
              {
                hasCapitalCase: true,
              }
            ),
            // check whether the entered password has a lower case letter
            CustomValidators.patternValidator(
              /[a-z]/g,
              this.paswdProfile.lowerCase,
              {
                hasSmallCase: true,
              }
            ),
            // check whether the entered password has a special character
            CustomValidators.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,
              this.paswdProfile.specialChar,
              {
                hasSpecialCharacters: true,
              }
            ),
            Validators.minLength(this.paswdProfile.minChar),
          ]),
        ],
        confirmPassword: [null, Validators.compose([Validators.required])],
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator,
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.userform.controls;
  }
  // Submit user form details to backend
  onSubmit(): void {
    if (!this.userId) {
      // If userId not exist then creating user
      this.userService.createUser(this.userform.value).subscribe({
        next: (result) => {
          this.router.navigate(['users']); //navigate to login page or componenent
          this._snackBar.open('User created.', 'Dismiss', {
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
      // If userId  exist then updating existing user

      this.userService
        .updateUserById(this.userform.value, this.userId)
        .subscribe({
          next: (result) => {
            this.router.navigate(['/users/list']); //navigate to login page or componenent
            this._snackBar.open('User updated.', 'Dismiss', {
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

    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe((response: any) => {
        response['confirmPassword'] = response.password;
        this.userform.patchValue(response);
      });
    }
  }
}
export interface IPasswordProfile {
  minChar: number;
  numbers: number;
  upperCase: number;
  lowerCase: number;
  specialChar: number;
  maxPasswordAge: number;
  uniqueness: number;
}
