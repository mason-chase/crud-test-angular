export class Customer{
  private id:number=0;
  private firstname:string='';
  private  lastName:string='';
  private  dateOfBirth:Date=new Date();
  private  phoneNumber:string='';
  private  email:string='';
  private bankAccountNumber:string='';
constructor(firstName:string , lastName:string,dataBirth:Date,phoneNumber:string,email:string,bankAccountNumber:string) {

  this.firstname=firstName
  this.lastName=lastName
  this.dateOfBirth=dataBirth
  this.phoneNumber=firstName
  this.email=email
  this.bankAccountNumber=bankAccountNumber


}
}
