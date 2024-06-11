import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabsRoutingModule } from './labs-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { LabsComponent } from './labs.component';
import { CellEditor, TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RatingModule } from 'primeng/rating';


@NgModule({
  declarations: [
    LabsComponent
  ],
  imports: [
    CommonModule,
    LabsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    TableModule,
    FontAwesomeModule,
    RatingModule
  ]
})
export class LabsModule { }
