import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiURL = environment.apiURL;
  noAuthHeaders = { headers: new HttpHeaders({ noauth: '1' }) };
  constructor(private http: HttpClient) {}
  /**
   * Authenticate user
   */
  authenticate(authenticationDetails: any) {
    return this.http.post(
      this.apiURL + '/api/authenticate',
      authenticationDetails,
      this.noAuthHeaders
    );
  }
  /**
   * GET current user details
   */
  getUser() {
    return this.http.get(this.apiURL + '/api/users/me');
  }
  /**
   * GET list of all users
   */
  getUserList() {
    return this.http.get(this.apiURL + '/api/user/list11');
  }
  /**
   * SET TOKEN in localStorage
   */
  setToken(token: any) {
    localStorage.setItem('token', token);
  }
  /**
   * Remove TOKEN from localStorage
   */
  resetToken() {
    localStorage.removeItem('token');
  }
  /**
   * GET TOKEN from localStorage
   */
  readToken() {
    let token = localStorage.getItem('token');

    if (token) {
      let userData: any = atob(token.split('.')[1]);
      return JSON.parse(userData);
    } else return null;
  }
  /**
   * Check token validation
   */
  isLoggedIn() {
    let userPayload: any = this.readToken();

    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else return false;
  }
  /**
   * GET TOKEN data from localStorage
   */
  getToken() {
    return localStorage.getItem('token');
  }

  getUserProfile() {
    return this.http.get(this.apiURL + '/api/user/profile');
  }
  /**
   * Create new user
   */
  createUser(createUserPayload: any) {
    return this.http
      .post(this.apiURL + '/api/user/create', createUserPayload)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  /**
   * DELETE user by ID
   */
  deleteUser(userId) {
    return this.http.delete(this.apiURL + '/api/user/delete/' + userId).pipe(
      map((list) => {
        return list;
      })
    );
  }
  /**
   * GET  user by ID
   */
  getUserById(userId) {
    return this.http.get(this.apiURL + '/api/user/fetch/' + userId);
  }
  /**
   * Update user by ID
   */
  updateUserById(userPayload: any, userId) {
    return this.http
      .put(this.apiURL + '/api/user/update/' + userId, userPayload)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
}
