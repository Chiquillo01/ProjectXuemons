import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XuxemonsComponent } from './xuxemons.component';

describe('XuxemonsComponent', () => {
  let component: XuxemonsComponent;
  let fixture: ComponentFixture<XuxemonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XuxemonsComponent]
    });
    fixture = TestBed.createComponent(XuxemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
