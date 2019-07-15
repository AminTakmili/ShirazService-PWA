import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanceledRequestComponent } from './canceled-request.component';

describe('CanceledRequestComponent', () => {
  let component: CanceledRequestComponent;
  let fixture: ComponentFixture<CanceledRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanceledRequestComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanceledRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
