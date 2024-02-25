import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDashComponent } from './form-dash.component';

describe('FormDashComponent', () => {
  let component: FormDashComponent;
  let fixture: ComponentFixture<FormDashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormDashComponent]
    });
    fixture = TestBed.createComponent(FormDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
