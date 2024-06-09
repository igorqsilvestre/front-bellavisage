import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from './shared/shared.module';
import { HomeModule } from './pages/home/home.module';
import { LoginModule } from './pages/login/login.module';
import { PacienteModule } from './pages/paciente/paciente.module'
import { TratamentoModule } from './pages/tratamento/tratamento.module';
import { EspecialistaModule } from './pages/especialista/especialista.module';
import { AgendamentoModule } from './pages/agendamento/agendamento.module';


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
    SharedModule,
    HomeModule,
    LoginModule,
    PacienteModule,
    TratamentoModule,
    EspecialistaModule,
    AgendamentoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
