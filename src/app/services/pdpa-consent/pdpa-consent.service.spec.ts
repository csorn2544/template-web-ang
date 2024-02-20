import { TestBed } from '@angular/core/testing';

import { PdpaConsentService } from './pdpa-consent.service';

describe('PdpaConsentService', () => {
  let service: PdpaConsentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdpaConsentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
