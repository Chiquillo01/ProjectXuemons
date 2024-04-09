import { TestBed } from '@angular/core/testing';

import { ChuchesService } from './chuches.service';

describe('ChuchesService', () => {
  let service: ChuchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChuchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
