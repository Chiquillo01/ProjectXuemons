import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XuxedexComponent } from './xuxedex.component';

describe('XuxedexComponent', () => {
  let component: XuxedexComponent;
  let fixture: ComponentFixture<XuxedexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XuxedexComponent]
    });
    fixture = TestBed.createComponent(XuxedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
