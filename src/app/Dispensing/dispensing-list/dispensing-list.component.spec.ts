import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensingListComponent } from './dispensing-list.component';

describe('DispensingListComponent', () => {
  let component: DispensingListComponent;
  let fixture: ComponentFixture<DispensingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispensingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DispensingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
