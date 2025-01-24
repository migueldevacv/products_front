import { Injectable } from '@angular/core';
import { environment } from '../../env/enviroment.dev';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { IntResUsers, IntUser } from '../interfaces/Auth/UserInterface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  catalogs: string = `${environment.domain}catalogs/`

  constructor(private http: HttpClient, private _cookieService: CookieService) { }

  post(info: IntUser) {
    return this.http.post<IntResUsers>(`${this.catalogs}users`, info)
  }

  get() {
    return this.http.get<IntResUsers>(`${this.catalogs}users`)
  }

  update(id: number, data: IntUser) {
    return this.http.put<IntResUsers>(`${this.catalogs}users/${id}`, data)
  }

  delete(id: number) {
    return this.http.delete<IntResUsers>(`${this.catalogs}users/${id}`)
  }
};