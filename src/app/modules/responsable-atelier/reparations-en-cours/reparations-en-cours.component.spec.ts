import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationsEnCoursComponent } from './reparations-en-cours.component';

describe('ReparationsEnCoursComponent', () => {
  let component: ReparationsEnCoursComponent;
  let fixture: ComponentFixture<ReparationsEnCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReparationsEnCoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReparationsEnCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
