import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoControlErroTesteComponent } from './campo-control-erro-teste.component';

describe('CampoControlErroTesteComponent', () => {
  let component: CampoControlErroTesteComponent;
  let fixture: ComponentFixture<CampoControlErroTesteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampoControlErroTesteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CampoControlErroTesteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
