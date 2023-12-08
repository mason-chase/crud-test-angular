import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-customer-delete-confirmation',
    templateUrl: './customer-delete-confirmation.component.html'
})
export class CustomerDeleteConfirmationComponent {
    @Input() display: boolean;
    @Output() onDeleteConfirmed: EventEmitter<void> = new EventEmitter();
    @Output() onCancel: EventEmitter<void> = new EventEmitter();

    confirmDelete(): void {
        this.onDeleteConfirmed.emit();
    }

    cancelDelete(): void {
        this.onCancel.emit();
    }
}