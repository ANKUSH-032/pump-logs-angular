import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensingAddComponent } from './dispensing-add.component';

describe('DispensingAddComponent', () => {
  let component: DispensingAddComponent;
  let fixture: ComponentFixture<DispensingAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispensingAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DispensingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
