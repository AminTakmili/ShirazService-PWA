import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyScoreComponent } from './my-score.component';

describe('MyScoreComponent', () => {
  let component: MyScoreComponent;
  let fixture: ComponentFixture<MyScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyScoreComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
