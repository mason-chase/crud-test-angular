import { Observable, map, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ICustomer } from './models/customer.interface';
import { LocalStorage } from 'src/shared/utils/local-storage';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { CustomerItemComponent } from './components/customer-item/customer-item.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    CustomerItemComponent,
  ],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers$: Observable<ICustomer[]> = of()

  constructor(
    private _dialog: MatDialog,
    private localStorage: LocalStorage,
  ) { }

  ngOnInit(): void {
    this.customers$ = this.getCustomers();
  }

  getCustomers(): Observable<ICustomer[]> {
    let customers: ICustomer[] = [];
    let localCustomers: ICustomer[] = JSON.parse(this.localStorage.getItem('CUSTOMERS'))
    customers = [...localCustomers];
    return of(customers)
  }

  create() {
    let dialog = this._dialog.open(EditCustomerComponent, {
      panelClass: 'edit-dialog',
      data: {
        customer: {},
        edit_mood: false
      }
    });
  }

  edit(customer: ICustomer) {
    let dialog = this._dialog.open(EditCustomerComponent, {
      panelClass: 'edit-dialog',
      data: {
        customer,
        edit_mood: true
      }
    });

    dialog.afterClosed().subscribe((res: ICustomer) => {
      this.customers$ = this.customers$.pipe(
        map(customers => {
          let index = customers.findIndex(x => x.PhoneNumber === res.PhoneNumber);
          if (index > -1) {
            customers[index] = res;
          }
          this.handleChanges(customers);
          return customers;
        })
      );
    });
  }

  remove(customer: ICustomer) {
    this.customers$ = this.customers$.pipe(
      map(customers => {
        let index = customers.findIndex(x => x.Email === customer.Email);
        if (index > -1) {
          customers.splice(index, 1)
        }
        this.handleChanges(customers);
        return customers;
      })
    );
  }

  handleChanges(customers: ICustomer[]) {
    this.localStorage.setItem('CUSTOMERS', JSON.stringify(customers));
  }
}
