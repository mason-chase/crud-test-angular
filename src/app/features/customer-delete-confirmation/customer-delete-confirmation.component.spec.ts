import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerDeleteConfirmationComponent } from './customer-delete-confirmation.component';
import { EventEmitter } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CustomerDeleteConfirmationComponent', () => {
    let fixture: ComponentFixture<CustomerDeleteConfirmationComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CustomerDeleteConfirmationComponent],
            imports: [DialogModule, BrowserAnimationsModule],
        });
    });

    it('should create the component', () => {
        let fixture = TestBed.createComponent(CustomerDeleteConfirmationComponent);
        let component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });

    it('should emit onDeleteConfirmed when confirmDelete is called', () => {
        const onDeleteConfirmedSpy = jasmine.createSpy('onDeleteConfirmed');
        let fixture = TestBed.createComponent(CustomerDeleteConfirmationComponent);
        let component = fixture.componentInstance;

        component.onDeleteConfirmed.subscribe(onDeleteConfirmedSpy);

        component.confirmDelete();

        expect(onDeleteConfirmedSpy).toHaveBeenCalled();
    });

    it('should emit onCancel when cancelDelete is called', () => {
        const onCancelSpy = jasmine.createSpy('onCancel');
        let fixture = TestBed.createComponent(CustomerDeleteConfirmationComponent);
        let component = fixture.componentInstance;

        component.onCancel.subscribe(onCancelSpy);

        component.cancelDelete();

        expect(onCancelSpy).toHaveBeenCalled();
    });

    it('should set display to true when input display is true', () => {
        let fixture = TestBed.createComponent(CustomerDeleteConfirmationComponent);
        let component = fixture.componentInstance;

        component.display = true;
        fixture.detectChanges();

        const dialogElement = fixture.nativeElement.querySelector('.p-dialog');

        expect(dialogElement).toBeTruthy();
    });

    it('should set display to false when input display is false', () => {
        let fixture = TestBed.createComponent(CustomerDeleteConfirmationComponent);
        let component = fixture.componentInstance;

        component.display = false;
        fixture.detectChanges();

        const dialogElement = fixture.nativeElement.querySelector('.p-dialog');

        expect(dialogElement).toBeFalsy();
    });
});