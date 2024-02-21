import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdpaPrivacyComponent } from './pdpa-privacy.component';

describe('PdpaPrivacyComponent', () => {
  let component: PdpaPrivacyComponent;
  let fixture: ComponentFixture<PdpaPrivacyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdpaPrivacyComponent]
    });
    fixture = TestBed.createComponent(PdpaPrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
