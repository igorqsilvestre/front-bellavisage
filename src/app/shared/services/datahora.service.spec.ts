import { TestBed } from '@angular/core/testing';

import { DatahoraService } from './datahora.service';

describe('DatahoraService', () => {
  let service: DatahoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatahoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
