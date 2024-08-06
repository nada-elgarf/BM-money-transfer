/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IdleService } from './idle.service';

describe('Service: Idle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IdleService]
    });
  });

  it('should ...', inject([IdleService], (service: IdleService) => {
    expect(service).toBeTruthy();
  }));
});
