import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaireDevisPopUpComponent } from './faire-devis-pop-up.component';

describe('FaireDevisPopUpComponent', () => {
  let component: FaireDevisPopUpComponent;
  let fixture: ComponentFixture<FaireDevisPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaireDevisPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaireDevisPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
