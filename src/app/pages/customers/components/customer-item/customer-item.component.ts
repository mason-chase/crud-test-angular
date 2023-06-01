import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ICustomer } from '../../models/customer.interface';

@Component({
  selector: 'app-customer-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-item.component.html',
  styleUrls: ['./customer-item.component.css']
})
export class CustomerItemComponent {
  @Input({ required: true }) customr!: ICustomer;

}
