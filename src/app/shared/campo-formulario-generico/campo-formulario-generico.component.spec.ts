import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoFormularioGenericoComponent } from './campo-formulario-generico.component';

describe('CampoFormularioGenericoComponent', () => {
  let component: CampoFormularioGenericoComponent;
  let fixture: ComponentFixture<CampoFormularioGenericoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampoFormularioGenericoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CampoFormularioGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
