import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdpaConsentDetailComponent } from './pdpa-consent-detail.component';

describe('PdpaConsentDetailComponent', () => {
  let component: PdpaConsentDetailComponent;
  let fixture: ComponentFixture<PdpaConsentDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdpaConsentDetailComponent]
    });
    fixture = TestBed.createComponent(PdpaConsentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
