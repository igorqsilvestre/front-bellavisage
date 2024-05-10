import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarSenhaFormComponent } from './alterar-senha-form.component';

describe('AlterarSenhaFormComponent', () => {
  let component: AlterarSenhaFormComponent;
  let fixture: ComponentFixture<AlterarSenhaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlterarSenhaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlterarSenhaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
