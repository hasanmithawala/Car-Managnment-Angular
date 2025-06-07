import { TestBed } from '@angular/core/testing';

import { ModellistService } from './modellist.service';

describe('ModellistService', () => {
  let service: ModellistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModellistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
