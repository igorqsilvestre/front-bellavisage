import { NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';

import { AppAngularModule } from '../../shared/app-angular.module';
import { AppPrimengModule } from '../../shared/app-primeng.module';
import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FaturamentoComponent } from './dashboard-faturamento/faturamento.component';




@NgModule({
    declarations: [
        FaturamentoComponent
    ],
    imports: [
        AppAngularModule,
        AppPrimengModule,
        DashboardRoutingModule,
        DropdownModule,
        SharedModule,
    ]
})
export class DashboardModule { }
