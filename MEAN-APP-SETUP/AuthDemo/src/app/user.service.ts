import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiURL = environment.apiURL;
  noAuthHeaders = { headers: new HttpHeaders({ noauth: '1' }) };
  constructor(private http: HttpClient) {}

  authenticate(authenticationDetails: any) {
    return this.http.post(
      this.apiURL + '/api/authenticate',
      authenticationDetails,
      this.noAuthHeaders
    );
  }
  getUser() {
    return this.http.get(this.apiURL + '/api/users/me');
  }
  setToken(token: any) {
    localStorage.setItem('token', token);
  }
  resetToken() {
    localStorage.removeItem('token');
  }
  readToken() {
    let token = localStorage.getItem('token');

    if (token) {
      let userData: any = atob(token.split('.')[1]);
      return JSON.parse(userData);
    } else return null;
  }
  isLoggedIn() {
    let userPayload: any = this.readToken();

    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else return false;
  }
  getToken() {
    return localStorage.getItem('token');
  }

  getUserProfile() {
    return this.http.get(this.apiURL + '/api/user/user-profile');
  }
}
