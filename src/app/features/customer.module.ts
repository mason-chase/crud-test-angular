import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import {DialogModule} from 'primeng/dialog';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerDeleteConfirmationComponent } from './customer-delete-confirmation/customer-delete-confirmation.component';

@NgModule({
    declarations: [
        CustomerListComponent,
        CustomerEditComponent,
        CustomerDeleteConfirmationComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ToolbarModule,
        TableModule,
        InputTextModule,
        CalendarModule,
        DialogModule
    ],
    exports: [
        CustomerListComponent
    ],
})
export class CustomerModule { }