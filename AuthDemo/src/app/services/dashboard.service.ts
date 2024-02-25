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
   * Update widget by ID
   */
  updateWidgetById(userPayload: any, widgetId) {
    console.table(userPayload);
    return this.http
      .put(this.apiURL + '/api/widget/update/' + widgetId, userPayload)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
}
