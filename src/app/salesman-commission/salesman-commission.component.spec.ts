import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesmanCommissionComponent } from './salesman-commission.component';

describe('SalesmanCommissionComponent', () => {
  let component: SalesmanCommissionComponent;
  let fixture: ComponentFixture<SalesmanCommissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesmanCommissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesmanCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
