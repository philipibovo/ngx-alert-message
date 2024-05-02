import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateConfigComponent } from './generate-config.component';

describe('GenerateConfigComponent', () => {
  let component: GenerateConfigComponent;
  let fixture: ComponentFixture<GenerateConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateConfigComponent]
    });
    fixture = TestBed.createComponent(GenerateConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
