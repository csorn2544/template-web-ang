import { TestBed } from '@angular/core/testing';

import { PdpaPrivacyService } from './pdpa-privacy.service';

describe('PdpaPrivacyService', () => {
  let service: PdpaPrivacyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdpaPrivacyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
