import { TestBed } from '@angular/core/testing';

import { MapCreatorService } from './map-creator.service';

describe('MapCreatorService', () => {
  let service: MapCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
