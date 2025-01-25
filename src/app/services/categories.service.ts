import { Injectable } from '@angular/core';
import { environment } from '../../env/enviroment.dev';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { IntCategories, IntResCategories } from '../interfaces/Catalogs/CategoriesInterface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  catalogs: string = `${environment.domain}catalogs/`

  constructor(private http: HttpClient, private _cookieService: CookieService) { }

  post(info: IntCategories) {
    return this.http.post<IntResCategories>(`${this.catalogs}categories`, info)
  }

  get() {
    return this.http.get<IntResCategories>(`${this.catalogs}categories`)
  }

  update(id: number, data: IntCategories) {
    return this.http.put<IntResCategories>(`${this.catalogs}categories/${id}`, data)
  }

  delete(id: number) {
    return this.http.delete<IntResCategories>(`${this.catalogs}categories/${id}`)
  }

  getActive() {
    return this.http.get<IntResCategories>(`${this.catalogs}active/categories`)
  }
};