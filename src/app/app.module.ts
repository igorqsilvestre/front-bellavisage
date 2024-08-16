import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { AgendamentoModule } from './pages/agendamento/agendamento.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { EspecialistaModule } from './pages/especialista/especialista.module';
import { HomeModule } from './pages/home/home.module';
import { LoginModule } from './pages/login/login.module';
import { PacienteModule } from './pages/paciente/paciente.module';
import { TratamentoModule } from './pages/tratamento/tratamento.module';
import { SharedModule } from './shared/shared.module';


registerLocaleData(ptBr);

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
    LoginModule,
    PacienteModule,
    TratamentoModule,
    EspecialistaModule,
    AgendamentoModule,
    HomeModule,
    CardModule,
    ButtonModule,
    DashboardModule,
  ],
  providers: [
    provideAnimationsAsync(),
    AuthGuard,
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
