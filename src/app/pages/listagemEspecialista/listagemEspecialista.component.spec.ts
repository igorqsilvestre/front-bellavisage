import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListagemEspecialistaComponent } from './listagemEspecialista.component';

describe('ListagemEspecialistaComponent', () => {
  let component: ListagemEspecialistaComponent;
  let fixture: ComponentFixture<ListagemEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListagemEspecialistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
