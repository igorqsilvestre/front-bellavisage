import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListagemPagamentosComponent } from './listagemPagamentos.component';

describe('ListagemPagamentosComponent', () => {
  let component: ListagemPagamentosComponent;
  let fixture: ComponentFixture<ListagemPagamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListagemPagamentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemPagamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
