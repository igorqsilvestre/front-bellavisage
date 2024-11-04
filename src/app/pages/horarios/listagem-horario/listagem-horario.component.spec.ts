import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemHorarioComponent } from './listagem-horario.component';

describe('ListagemHorarioComponent', () => {
  let component: ListagemHorarioComponent;
  let fixture: ComponentFixture<ListagemHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListagemHorarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListagemHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
