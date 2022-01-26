import { Injectable } from "@angular/core";
import { CustomerDTO } from "./models/users.dto";

@Injectable({
    providedIn: 'root'
})

export class UsersSerivce {

    constructor() { }

    users: CustomerDTO[] = [];
  
    




}