import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionDisplayComponent } from './description-display.component';

describe('DescriptionDisplayComponent', () => {
  let component: DescriptionDisplayComponent;
  let fixture: ComponentFixture<DescriptionDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
