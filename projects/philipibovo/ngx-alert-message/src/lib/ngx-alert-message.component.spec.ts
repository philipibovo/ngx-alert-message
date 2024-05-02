import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAlertMessage } from './ngx-alert-message.component';

describe('NgxAlertMessage', () => {
  let component: NgxAlertMessage;
  let fixture: ComponentFixture<NgxAlertMessage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxAlertMessage],
    });
    fixture = TestBed.createComponent(NgxAlertMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
