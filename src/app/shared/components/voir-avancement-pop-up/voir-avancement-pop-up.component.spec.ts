import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirAvancementPopUpComponent } from './voir-avancement-pop-up.component';

describe('VoirAvancementPopUpComponent', () => {
  let component: VoirAvancementPopUpComponent;
  let fixture: ComponentFixture<VoirAvancementPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoirAvancementPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoirAvancementPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
