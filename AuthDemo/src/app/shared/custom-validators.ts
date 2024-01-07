import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export class CustomValidators {
  static patternValidator(
    regex: RegExp,
    requiredTimes: number,
    error: ValidationErrors
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const value: string = control.value;
      const valid = (value.match(regex) || []).length >= requiredTimes;
      // console.log((value.match(regex) || []).length + ' - ' + requiredTimes);
      return valid ? null : error;
    };
  }

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value;
    const confirmPassword: string = control.get('confirmPassword').value;
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      //   console.log('No mathch' + password + ' - ' + confirmPassword);
      return { matchError: 'Passwords do not match' };
    }
  }
}
