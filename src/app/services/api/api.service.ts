import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerModel} from "../../models/customer.model";
import {UserLoginModel} from "../../models/user.login.model";
import {take} from "rxjs";


/**
 * The table service directly calls from HttpClient
 * */
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = ``;
  constructor(private http: HttpClient) {
    if (typeof window !== `undefined` && window.document) {
      // @ts-ignore
      this.API_URL = window.API_URL;
    }
  }

  // users -------------------------------------------------------------------------------------------------------------
  get users() {
    return this.http.get<UserLoginModel[]>(`${this.API_URL}/users`).pipe(take(1))
  }

  // customers ---------------------------------------------------------------------------------------------------------
  get customers() {
    return this.http.get<CustomerModel[]>(`${this.API_URL}/customers`).pipe(take(1))
  }

}
