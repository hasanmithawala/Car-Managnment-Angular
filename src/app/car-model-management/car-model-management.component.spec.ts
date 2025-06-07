import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarModelManagementComponent } from './car-model-management.component';

describe('CarModelManagementComponent', () => {
  let component: CarModelManagementComponent;
  let fixture: ComponentFixture<CarModelManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarModelManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarModelManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
