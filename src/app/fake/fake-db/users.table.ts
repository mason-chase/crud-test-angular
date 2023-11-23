import {UserLoginModel} from "../../models/user.login.model";

export class UsersTable {

  public static users: UserLoginModel[] = [
    {
      id: '1',
      email: 'example@example.com',
      phone: '+98902_you_wish',
      firstName: 'Ryan',
      lastName: 'Asgari',
      role: 'gods_perfect_creation',
      token: 'That, is a private question',
      created: 'I was BORN god damn it...',
      profile: 'wikipedia.com/sexiest-man-alive/profile'
    }
  ];

}
