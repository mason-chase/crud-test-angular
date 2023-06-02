import { CommonModule } from '@angular/common';
import { FullnamePipe } from '../../pipes/fullname.pipe';
import { ICustomer } from '../../models/customer.interface';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-customer-item',
  standalone: true,
  imports: [
    CommonModule,
    FullnamePipe,
  ],
  templateUrl: './customer-item.component.html',
  styleUrls: ['./customer-item.component.css']
})
export class CustomerItemComponent {
  @Input({ required: true }) customer!: ICustomer;
  @Input({ required: true }) index!: number;

  @Output() edit: EventEmitter<ICustomer> = new EventEmitter<ICustomer>();
  @Output() remove: EventEmitter<ICustomer> = new EventEmitter<ICustomer>();

  editHandler() {
    this.edit.emit(this.customer)
  }

  removeHandler() {
    this.remove.emit(this.customer)
  }
}
