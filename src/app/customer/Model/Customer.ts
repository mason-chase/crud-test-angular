export class Customer{

    _id: string='' ;
   _firstname:string;
   _lastName:string;
   _dateOfBirth:Date;
   _phoneNumber:string;
   _email:string;
   _bankAccountNumber:string='';
constructor(firstName:string , lastName:string,dataBirth:Date,phoneNumber:string,email:string,bankAccountNumber:string) {

  this._firstname=firstName
  this._lastName=lastName
  this._dateOfBirth=dataBirth
  this._phoneNumber=phoneNumber
  this._email=email
  this._bankAccountNumber=bankAccountNumber


}



}
