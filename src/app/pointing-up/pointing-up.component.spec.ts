import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointingUpComponent } from './pointing-up.component';

describe('PointingUpComponent', () => {
  let component: PointingUpComponent;
  let fixture: ComponentFixture<PointingUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointingUpComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointingUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
