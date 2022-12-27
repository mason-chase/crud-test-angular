import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PhoneNumberUtil, PhoneNumber } from 'google-libphonenumber';
import { customerModel } from './customer.model';
import { MessageService } from './message.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'test';
  number:any
  phoneUtil!: PhoneNumberUtil;
  userAccountForm!:FormGroup;
  customersList:any[]=[];

  constructor(private fb:FormBuilder,
    private messageService:MessageService,
    ){}

ngOnInit(){
  this.getUserInfo();


  this.phoneUtil = PhoneNumberUtil.getInstance();
  this.createForm();
}


getUserInfo(){
this.customersList = JSON.parse(localStorage.getItem('user-account') || '{}');
}

registerUser(){

  if(this.customersList.length >0){
    
    this.customersList.forEach((element:customerModel) => {

      
      if((element.firstName==this.userAccountForm.controls['firstName'].value) || (element.lastName==this.userAccountForm.controls['lastName'].value)
      || (element.email==this.userAccountForm.controls['email'].value || (element.dateOfBirth==this.userAccountForm.controls['dateOfBirth'].value) ) 
      ){
        this.messageService.error("errorr","this user has already registered")
      }else{

        this.number=this.phoneUtil.parse(this.userAccountForm.controls['phoneNumber'].value,'US')
        const isValidNumber=this.phoneUtil.isValidNumber(this.number);
      
        if(isValidNumber==false){
          this.messageService.error("error","please enter valid phone number");
          return
        }else{
      
          this.customersList.push(this.userAccountForm.value);
          localStorage.setItem('user-account', JSON.stringify(this.customersList));
          
          }
      
      }
      
    });
  }
}

createForm(){
  this.userAccountForm=this.fb.group({
    firstName:[''],
    lastName:[''],
    dateOfBirth:[''],
    phoneNumber:[''],
    email:[
      '',
     [ Validators.required,Validators.pattern(`^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$`)],
    ],
    bankAccountNummber:['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]]
  });


}

updateDOB(dateObject:any) {
  const stringified = JSON.stringify(dateObject.value);
  const dateOfBirth = stringified.substring(1, 11);
  this.userAccountForm.patchValue({
    dateOfBirth:dateOfBirth
  })
}

}
