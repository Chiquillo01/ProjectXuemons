import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentarComponent } from './alimentar.component';

describe('AlimentarComponent', () => {
  let component: AlimentarComponent;
  let fixture: ComponentFixture<AlimentarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlimentarComponent]
    });
    fixture = TestBed.createComponent(AlimentarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
