import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SidebarComponent],
            imports: [RouterTestingModule],
        });
    });

    it('should create the app', () => {
        let fixture = TestBed.createComponent(SidebarComponent);
        let component = fixture.componentInstance;

        expect(component).toBeTruthy();
    });

    it('should navigate to the correct path when clicked', () => {
        let fixture = TestBed.createComponent(SidebarComponent);
        let component = fixture.componentInstance;

        spyOn(component['router'], 'navigate');

        const linkElement = fixture.debugElement.query(By.css('.menu li'));
        linkElement.triggerEventHandler('click', null);

        expect(component['router'].navigate).toHaveBeenCalledWith(['/']);
    });
});