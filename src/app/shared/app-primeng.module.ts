import { NgModule } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { CalendarModule } from 'primeng/calendar';
import { RatingModule } from 'primeng/rating';


@NgModule({
  exports: [
    ToastModule,
    CardModule,
    TableModule,
    InputIconModule,
    IconFieldModule,
    CalendarModule,
    RatingModule
  ]
})
export class AppPrimengModule { }
