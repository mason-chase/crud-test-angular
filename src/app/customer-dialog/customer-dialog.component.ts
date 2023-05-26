import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../shared/modeles/customer';
import { StorageService } from '../shared/services/storage.service';
import { PhoneNumberValidator } from '../shared/validators/custom-validators';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.css'],
})
export class CustomerDialogComponent implements OnInit{

  @Output() dialogClosed = new EventEmitter<Customer | null>();

  @Input() customer:Customer | null = null;

  customerForm = new FormGroup({
    firstname: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.maxLength(32)]),
    lastname: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.maxLength(32)]),
    dateOfBirth: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern('^[1-4]\\d{3}\\/((0[1-6]\\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\\/(30|([1-2][0-9])|(0[1-9]))))$')]),
    phoneNumber:new FormControl({ value: '', disabled: false }, [PhoneNumberValidator('IR')]),
    email: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    bankAccountNumber: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern('^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$')]),
  });

  constructor(
    private storageService:StorageService
  ) { }

  ngOnInit() {
    if (this.customer) {
      this.customerForm.setValue({
        firstname:this.customer.firstname,
        lastname: this.customer.lastname,
        dateOfBirth:this.customer.dateOfBirth,
        phoneNumber:this.customer.phoneNumber,
        email: this.customer.email,
        bankAccountNumber:this.customer.bankAccountNumber,
      });
    }
  }

  @HostListener('document:keyup.escape')
  closeDialog(){
    this.dialogClosed.emit(this.customer);
    this.customerForm.reset();
    this.customer = null;
  }
  
  @HostListener('document:keyup.enter')
  submit(){
    if (this.customerForm.invalid) {
      return;
    }
    if (this.customer) {
      this.storageService.editItem({...this.customerForm.value, id:this.customer.id});
      this.closeDialog();
    } else {
      const state = this.storageService.addItem(this.customerForm.value);
      switch (state.status) {
        case 123:
          this.customerForm.controls['firstname'].setErrors({'incorrect': true});
          this.customerForm.controls['lastname'].setErrors({'incorrect': true});
          this.customerForm.controls['dateOfBirth'].setErrors({'incorrect': true});
          break;
        case 5:
          this.customerForm.controls['email'].setErrors({'incorrect': true});
          break;
      
        default:
          this.closeDialog();
          break;
      }
    }
    
  }

}
