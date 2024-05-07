import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputGenericoComponent } from './input-generico.component';

describe('InputGenericoComponent', () => {
  let component: InputGenericoComponent;
  let fixture: ComponentFixture<InputGenericoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputGenericoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
