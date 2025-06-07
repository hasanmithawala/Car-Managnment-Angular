import { TestBed } from '@angular/core/testing';

import { CarmodelService } from './carmodel.service';

describe('CarmodelService', () => {
  let service: CarmodelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarmodelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
