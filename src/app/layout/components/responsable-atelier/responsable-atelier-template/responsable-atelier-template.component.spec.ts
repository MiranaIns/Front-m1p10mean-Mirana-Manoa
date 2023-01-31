import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsableAtelierTemplateComponent } from './responsable-atelier-template.component';

describe('ResponsableAtelierTemplateComponent', () => {
  let component: ResponsableAtelierTemplateComponent;
  let fixture: ComponentFixture<ResponsableAtelierTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsableAtelierTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsableAtelierTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
