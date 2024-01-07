import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor() {}
  // Handler for progress bar loading
  public isLoading = new BehaviorSubject(false);

  // Handler for spinner loading
  public isSpinnerLoading = new BehaviorSubject(false);
  // Handler for progress bar loading
  public isSpinnerLoading$ = this.isSpinnerLoading.pipe(
    switchMap((isLoading) => {
      if (!isLoading) return of(false);
      else return of(true).pipe(delay(3000));
    })
  );

  // To start spinner loading
  start() {
    this.isSpinnerLoading.next(true);
  }

  // To stop spinner loading
  stop() {
    this.isSpinnerLoading.next(false);
  }
}
