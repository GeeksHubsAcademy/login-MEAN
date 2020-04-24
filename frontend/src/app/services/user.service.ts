import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User;
  constructor(private httpClient: HttpClient) { }
  signup(user: User): Observable<any> {
    return this.httpClient.post<User>(environment.API_URL + '/users/signup', user);
  }
  login(user: User): Observable<any> {
    return this.httpClient.post(environment.API_URL + '/users/login', user);
  }
  getInfo(token: string): Observable<any> {
    return this.httpClient.get<User>(environment.API_URL + '/users/info', {
      headers: {
        Authorization: token
      }
    });
  }
  logout(token: string): Observable<any> {
    return this.httpClient.get<User>(environment.API_URL + '/users/logout', {
      headers: {
        Authorization: token
      }
    });
  }
  resetPassword(password,recoverToken) {
    return this.httpClient.post(environment.API_URL + '/users/resetPassword', {recoverToken, password });

  }
  setUser(user: User) {
    this.user = user;
  }
  getUser(): User {
    return this.user;
  }
}
