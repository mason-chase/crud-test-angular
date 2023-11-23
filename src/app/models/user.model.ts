export class UserModel {

  private _created: Date | string | undefined;
  private _email: string | undefined;
  private _firstName: string | undefined;
  private _id: string | undefined;
  private _biography: string | undefined;
  private _nationalId: string | undefined;
  private _birthDay: Date | undefined;
  private _lastName: string | undefined;
  private _phone: string | undefined;
  private _profile: string | undefined;
  private _role: string | undefined;


  // accessors ---------------------------------------------------------------------------------------------------------

  get profile(): string | undefined {
    return this._profile;
  }

  set profile(value: string | undefined) {
    this._profile = value;
  }

  get created(): Date | string | undefined {
    return this._created;
  }

  set created(value: Date | string | undefined) {
    this._created = value;
  }

  get email(): string | undefined {
    return this._email;
  }

  set email(value: string | undefined) {
    this._email = value;
  }

  get firstName(): string | undefined {
    return this._firstName;
  }

  set firstName(value: string | undefined) {
    this._firstName = value;
  }

  get id(): string | undefined {
    return this._id;
  }

  set id(value: string | undefined) {
    this._id = value;
  }

  get lastName(): string | undefined {
    return this._lastName;
  }

  set lastName(value: string | undefined) {
    this._lastName = value;
  }

  get phone(): string | undefined {
    return this._phone;
  }

  set phone(value: string | undefined) {
    this._phone = value;
  }

  get biography(): string | undefined {
    return this._biography;
  }

  set biography(value: string | undefined) {
    this._biography = value;
  }

  get role(): string | undefined {
    return this._role;
  }

  set role(value: string | undefined) {
    this._role = value;
  }

  get nationalId(): string | undefined {
    return this._nationalId;
  }

  set nationalId(value: string | undefined) {
    this._nationalId = value;
  }

  get birthDay(): Date | undefined {
    return this._birthDay;
  }

  set birthDay(value: Date | undefined) {
    this._birthDay = value;
  }


}
