import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerModel} from "../../models/customer.model";
import {UserLoginModel} from "../../models/user.login.model";

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
    return this.http.get<UserLoginModel[]>(`${this.API_URL}/users`)
  }


}
