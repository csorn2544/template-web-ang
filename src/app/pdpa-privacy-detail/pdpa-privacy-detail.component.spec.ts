import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdpaPrivacyDetailComponent } from './pdpa-privacy-detail.component';

describe('PdpaPrivacyDetailComponent', () => {
  let component: PdpaPrivacyDetailComponent;
  let fixture: ComponentFixture<PdpaPrivacyDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdpaPrivacyDetailComponent]
    });
    fixture = TestBed.createComponent(PdpaPrivacyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
