import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFaturamentoComponent } from './dashboard-faturamento.component';

describe('DashboardFaturamentoComponent', () => {
  let component: DashboardFaturamentoComponent;
  let fixture: ComponentFixture<DashboardFaturamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardFaturamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardFaturamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
