import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestComponent } from './request.component';

describe('RequestComponent', () => {
  let component: RequestComponent;
  let fixture: ComponentFixture<RequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger change detection
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct initial message', () => {
    const expectedMessage = 'This is a placeholder for the Request Component.';
    expect(component.message).toBe(expectedMessage);
  });

  it('should render the message in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const paragraph = compiled.querySelector('p');
    expect(paragraph?.textContent).toContain('This is a placeholder for the Request Component.');
  });
});
