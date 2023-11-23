import {Injectable} from '@angular/core';
import {map, take} from 'rxjs';
import {Router} from "@angular/router";
import {ApiService} from "../../services/api/api.service";
import {UserModel} from "../../models/user.model";
import {UserLoginModel} from "../../models/user.login.model";

@Injectable({
  providedIn: "root"
})

export class AuthService {

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    if (typeof window !== `undefined` && window.document) {
      // @ts-ignore
      this.currentUser = window.user ? window.user : null;
    }
  }

  private _currentUser: UserModel | null = null;

  get currentUser(): UserModel | null {
    return this._currentUser;
  }

  set currentUser(value: UserModel | null) {
    this._currentUser = value;
  }

  login(body: any) {
    return this.apiService.users.pipe(
      take(1),
      map(response => {

        let output;
        response.every(user => {
          if (user.email === body.email && user.token === body.password) {
            output = user;
            this.currentUser = AuthService.loadUser(user);
            localStorage.setItem(`COREX`, `${new Date().getTime()}!@_#${user.token}!@_#${user.id}`);
            return false;
          }
          return true;
        })
        if (!output) throw new Error('No one was found with this credentials!')

        return output

      })
    );

  }

  private static loadUser(userResponse: UserLoginModel) {
    const user = new UserModel();
    user.created = userResponse.created;
    user.role = userResponse.role;
    user.id = userResponse.id;
    user.email = userResponse.email;
    user.phone = userResponse.phone;
    user.firstName = userResponse.firstName;
    user.lastName = userResponse.lastName;
    user.profile = userResponse.profile;
    return user;
  }

  logout() {
    if (typeof window !== `undefined` && window.document) {
      this.currentUser = null;
      localStorage.removeItem(`COREX`);
      this.router.navigate([`/auth`]);
    }
  }

}
