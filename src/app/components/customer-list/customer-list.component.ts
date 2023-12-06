import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ICustomerVM } from 'src/app/models/customerVM';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  showEditDialog: boolean = false;
  modelItem;

  ngOnInit() {}

  customerList: ICustomerVM[] =
    JSON.parse(localStorage.getItem('CustomerList')) == null || undefined
      ? []
      : JSON.parse(localStorage.getItem('CustomerList'));

  activeIndex: number;
  itemInEditMode: boolean = false;

  CustomerDialog(index?: number) {
    debugger;
    this.activeIndex = index;
    if (typeof index != 'undefined' && index != null) {
      debugger;
      this.itemInEditMode = true;
    }
    if (typeof index != 'undefined') {
      this.modelItem = this.customerList[index];
    } else {
      this.modelItem = null;
    }
    this.showEditDialog = true;
  }

  closeDialog() {
    debugger;

    this.showEditDialog = false;
    this.itemInEditMode = false;
  }

  deleteCustomer(index: number, customer: ICustomerVM) {
    this.confirmationService.confirm({
      message: `Are you sure you want to remove ${customer.FirstName} ${customer.Lastname} ?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.customerList.splice(index, 1);
        this.SetCustomerToLocalStorage();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'The person was successfully removed.',
          life: 2000,
        });
      },
    });
  }

  addEditCustomer(customer: ICustomerVM) {
    debugger;
    let date = new Date(customer.DateOfBirth);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let fullDate = `${month}/${day}/${year}`;
    customer.DateOfBirth = fullDate;
    debugger;

    if (this.customerList?.length > 0) {
      debugger;
      let DuplicateCustomer = this.customerList.filter((x) => {
        return (
          x.FirstName.toLowerCase().trim() ==
            customer.FirstName.toLowerCase().trim() &&
          x.Lastname.toLowerCase().trim() ==
            customer.Lastname.toLowerCase().trim() &&
          x.DateOfBirth == customer.DateOfBirth
        );
      });

      let DuplicateEmails = this.customerList.filter((x) => {
        return (
          x.Email.toLowerCase().trim() == customer.Email.toLowerCase().trim()
        );
      });

      if (DuplicateCustomer.length > 0) {
        debugger;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Customer already exists !',
        });

        return;
      }

      if (DuplicateEmails.length > 0) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Email already exists !',
        });

        return;
      }
    }

    if (this.itemInEditMode) {
      debugger;
      this.customerList[this.activeIndex] = customer;
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Person edited successfully.',
        life: 2000,
      });
    } else {
      debugger;
      this.customerList.push(customer);
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Person added successfully.',
        life: 2000,
      });
    }
    this.closeDialog();
    this.SetCustomerToLocalStorage();
  }

  SetCustomerToLocalStorage() {
    localStorage.removeItem('CustomerList');
    localStorage.setItem('CustomerList', JSON.stringify(this.customerList));
    let getCustomerList = localStorage.getItem('CustomerList');
    this.customerList = JSON.parse(getCustomerList);
  }
}
