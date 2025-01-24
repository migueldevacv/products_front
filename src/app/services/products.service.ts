import { Injectable } from '@angular/core';
import { environment } from '../../env/enviroment.dev';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { IntProduct, IntResProducts } from '../interfaces/Catalogs/ProductsInterface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  catalogs: string = `${environment.domain}catalogs/`

  constructor(private http: HttpClient, private _cookieService: CookieService) { }

  post(info: IntProduct) {
    return this.http.post<IntResProducts>(`${this.catalogs}products`, info)
  }

  get() {
    return this.http.get<IntResProducts>(`${this.catalogs}products`)
  }

  update(id: number, data: IntProduct) {
    return this.http.put<IntResProducts>(`${this.catalogs}products/${id}`, data)
  }

  delete(id: number) {
    return this.http.delete<IntResProducts>(`${this.catalogs}products/${id}`)
  }
};