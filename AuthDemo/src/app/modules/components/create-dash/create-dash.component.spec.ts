import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDashComponent } from './create-dash.component';

describe('CreateDashComponent', () => {
  let component: CreateDashComponent;
  let fixture: ComponentFixture<CreateDashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDashComponent]
    });
    fixture = TestBed.createComponent(CreateDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
