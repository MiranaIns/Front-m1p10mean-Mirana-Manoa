import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirDevisPopUpComponent } from './voir-devis-pop-up.component';

describe('VoirDevisPopUpComponent', () => {
  let component: VoirDevisPopUpComponent;
  let fixture: ComponentFixture<VoirDevisPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoirDevisPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoirDevisPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
