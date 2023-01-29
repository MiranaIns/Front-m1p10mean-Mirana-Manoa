import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateurTemplateComponent } from './utilisateur-template.component';

describe('UtilisateurTemplateComponent', () => {
  let component: UtilisateurTemplateComponent;
  let fixture: ComponentFixture<UtilisateurTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilisateurTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilisateurTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
