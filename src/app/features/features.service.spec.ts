/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FeaturesService } from './features.service';

describe('Service: Features', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeaturesService]
    });
  });

  it('should ...', inject([FeaturesService], (service: FeaturesService) => {
    expect(service).toBeTruthy();
  }));
});
