import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MarvelAPIService } from './marvel-api.service';

describe('MarvelAPIService', () => {
  let service: MarvelAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MarvelAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
