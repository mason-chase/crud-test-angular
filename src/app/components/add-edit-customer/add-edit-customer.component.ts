import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ICustomerVM } from 'src/app/models/customerVM';

@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.css'],
})
export class AddEditCustomerComponent implements OnInit {
  constructor(private messageService: MessageService) {}
  @Output() OnCloseDialog: EventEmitter<any> = new EventEmitter();
  @Output() CustomerDetails: EventEmitter<any> = new EventEmitter();
  @Input() public set modelItem(_model:ICustomerVM) {
    if (!!_model) {
      this.addEditCutomerForm.reset(_model);
    } else {
      this.addEditCutomerForm.controls['PhoneNumber'].reset(null);
      this.addEditCutomerForm.controls['BankAccountNumber'].reset(null);
    }
  }
  customerDialog: boolean = true;

  ngOnInit() {}
  addEditCutomerForm: FormGroup = new FormGroup({
    FirstName: new FormControl('', Validators.required),
    Lastname: new FormControl('', Validators.required),
    PhoneNumber: new FormControl(' ', Validators.required),
    Email: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    DateOfBirth: new FormControl('', Validators.required),
    BankAccountNumber: new FormControl('', Validators.required),
  });

  closeDialog() {
    this.OnCloseDialog.emit();
  }

  saveCustomer() {
    if (this.addEditCutomerForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'please fill all the fields !',
      });
      return;
    }
    this.CustomerDetails.emit(this.addEditCutomerForm.value);
    this.closeDialog();
  }
}
