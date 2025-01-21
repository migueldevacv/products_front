import { IntReqLogin, IntReqRegister, IntResLogin, IntResRegister } from '../interfaces/Auth/AuthInterface';
import { environment } from '../../env/enviroment.dev';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { IntUser } from '../interfaces/Auth/UserInterface';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  sessionClosed = new EventEmitter<boolean>();
  sessionIntervalSet: Subject<boolean> = new Subject();
  sessionInterval!: any

  authRoute: string = `${environment.domain}auth/`

  constructor(private http: HttpClient, private _cookieService: CookieService, private _router: Router) { }

  login(info: IntReqLogin) {
    return this.http.post<IntResLogin>(`${this.authRoute}login`, info)
  }

  register(info: IntReqRegister) {
    return this.http.post<IntResRegister>(`${this.authRoute}register`, info)
  }

  setToken(token: string): void {
    this._cookieService.set('token', token, 4, '/')
  }

  getJwtToken() {
    return this._cookieService.get('token');
  }

  removeToken(): void {
    this._cookieService.delete('token');
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getUser() {
    return this._cookieService?.get('user') ? JSON.parse(this._cookieService?.get('user')) as IntUser : null
  }

  setUser(newUser: IntUser) {
    this._cookieService.set('user', JSON.stringify(newUser), 4, '/')
  }

  removeUser() {
    this._cookieService.delete('user');
  }

  hasUser() {
    return !!this._cookieService.get('user');;
  }

  logout(err?: any) {
    this.sessionClosed.emit(true)
    this.clearSessionInterval()
    setTimeout(() => {
      this._cookieService.deleteAll();
      this._router.navigateByUrl('auth/login');
      this.sessionClosed = new EventEmitter<boolean>();
    }, 1000)
  }

  initSessionInterval() {
    this.clearSessionInterval()
    this.createSessionInterval()
  }

  createSessionInterval() {
    if (!this.sessionInterval) {
      this.sessionInterval = setInterval(() => {
        if (!this.isLoggedIn()) {
          if (this._router.url != '/auth/login' && this._router.url != '/auth/register') {
            this.logout()
            return
          }
          if (this._router.url == '/auth/login' || this._router.url == '/auth/register') {
            return
          }
          this._router.navigate(['/app'])
        } 
      }, 1000)
    }
  }

  clearSessionInterval() {
    clearInterval(this.sessionInterval)
    this.sessionInterval = null
  }
}
