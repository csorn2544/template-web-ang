import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDiallogComponent } from './confirm-diallog.component';

describe('ConfirmDiallogComponent', () => {
  let component: ConfirmDiallogComponent;
  let fixture: ComponentFixture<ConfirmDiallogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDiallogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDiallogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
