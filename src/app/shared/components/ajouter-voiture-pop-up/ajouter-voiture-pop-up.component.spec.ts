import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterVoiturePopUpComponent } from './ajouter-voiture-pop-up.component';

describe('AjouterVoiturePopUpComponent', () => {
  let component: AjouterVoiturePopUpComponent;
  let fixture: ComponentFixture<AjouterVoiturePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterVoiturePopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterVoiturePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
