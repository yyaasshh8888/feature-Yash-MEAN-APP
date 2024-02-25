import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WidgetService {
  apiURL = environment.apiURL;
  noAuthHeaders = { headers: new HttpHeaders({ noauth: '1' }) };
  constructor(private http: HttpClient) {}

  /**
   * GET list of all users
   */
  getWidgetsList() {
    return this.http.get(this.apiURL + '/api/widget/list');
  }
  /**
   * GET list of all users
   */
  getDashboardsList() {
    return this.http.get(this.apiURL + '/api/dashboard/list');
  }
  /**
   * Update widget by ID
   */
  updateWidgetById(userPayload: any, widgetId) {
    return this.http
      .put(this.apiURL + '/api/widget/update/' + widgetId, userPayload)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  /**
   * Update widget by ID
   */
  createNewWidget(userPayload: any) {
    return this.http
      .post(this.apiURL + '/api/widget/create/', userPayload)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  /**
   * Update widget by ID
   */
  updateDashById(userPayload: any, Id) {
    return this.http
      .put(this.apiURL + '/api/dashboard/update/' + Id, userPayload)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  /**
   * Create
   */
  create(createUserPayload: any) {
    return this.http
      .post(this.apiURL + '/api/dashboard/create', createUserPayload)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  /**
   * DELETE
   */
  delete(userId) {
    return this.http
      .delete(this.apiURL + '/api/dashboard/delete/' + userId)
      .pipe(
        map((list) => {
          return list;
        })
      );
  }
  deleteWidget(id) {
    return this.http.delete(this.apiURL + '/api/widget/delete/' + id).pipe(
      map((list) => {
        return list;
      })
    );
  }
  /**
   * GET  user by ID
   */
  getById(Id) {
    return this.http.get(this.apiURL + '/api/dashboard/fetch/' + Id);
  }
}
