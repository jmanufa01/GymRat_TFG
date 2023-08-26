import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupersetComponent } from './superset.component';

describe('SupersetComponent', () => {
  let component: SupersetComponent;
  let fixture: ComponentFixture<SupersetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupersetComponent]
    });
    fixture = TestBed.createComponent(SupersetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
