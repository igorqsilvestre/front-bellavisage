import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';


import { HomeModule } from './pages/home/home.module';
import { LoginModule } from './pages/login/login.module';
import { PacienteModule } from './pages/paciente/paciente.module'
import { TratamentoModule } from './pages/tratamento/tratamento.module';
import { EspecialistaModule } from './pages/especialista/especialista.module';
import { AgendamentoModule } from './pages/agendamento/agendamento.module';
import { ListagemPagamentosModule } from './pages/listagemPagamentos/listagemPagamentos.module';
import { ListagemAgendamentoModule } from './pages/listagemAgendamento/listagemAgendamento.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DashboardFaturamentoModule } from './pages/dashboard-faturamento/dashboard-faturamento.module';
import { NgxEchartsModule } from 'ngx-echarts';

import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './guards/auth.guard';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    SharedModule,
    HomeModule,
    LoginModule,
    PacienteModule,
    TratamentoModule,
    EspecialistaModule,
    AgendamentoModule,
    ListagemPagamentosModule,
    ListagemAgendamentoModule,
    HomeModule,
    CardModule,
    ButtonModule,
    DashboardFaturamentoModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'), // do grafico de faturamento
    }),
  ],
  providers: [
    provideAnimationsAsync(),
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
