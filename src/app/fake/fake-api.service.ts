import { Injectable } from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {Observable} from "rxjs";
import {CustomersTable} from "./fake-db/customers.table";
import {UsersTable} from "./fake-db/users.table";

@Injectable({
  providedIn: 'root'
})
export class FakeApiService implements InMemoryDbService {

  constructor() { }

  /**
   * Create Fake DB and API
   */
  createDb(): {} | Observable<{}> {

    const db = {

      customers: CustomersTable.customers,

      // I actually load the user form auth.js because angular in memory only works inside angular
      // you know what I mean ...
      // but anyway I just put it here in case
      users: UsersTable.users

    };

    return db;
  }

}
