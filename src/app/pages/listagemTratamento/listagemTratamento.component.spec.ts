import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListagemTratamentoComponent } from './listagemTratamento.component';

describe('ListagemTratamentoComponent', () => {
  let component: ListagemTratamentoComponent;
  let fixture: ComponentFixture<ListagemTratamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListagemTratamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemTratamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
