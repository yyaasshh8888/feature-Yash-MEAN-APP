import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelperCacheService {
  constructor() {}
  private activeUser = new BehaviorSubject(null);
  public activeUser$ = this.activeUser.asObservable();

  setActiveUser(activeUser: any) {
    this.activeUser.next(activeUser);
  }
}
