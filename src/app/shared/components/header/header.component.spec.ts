import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    });
  });

  it('should create the app', () => {
    let fixture = TestBed.createComponent(HeaderComponent);
    let component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    const testTitle = 'Test Title';
    
    let fixture = TestBed.createComponent(HeaderComponent);
    let component = fixture.componentInstance;

    component.title = testTitle;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain(testTitle);
  });
});