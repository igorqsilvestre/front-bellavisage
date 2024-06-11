import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListagemAgendamentoComponent } from './listagemAgendamento.component';

describe('ListagemAgendamentoComponent', () => {
  let component: ListagemAgendamentoComponent;
  let fixture: ComponentFixture<ListagemAgendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListagemAgendamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
