import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { DropdownModule } from 'primeng/dropdown';


import { DashboardFaturamentoComponent } from './dashboard-faturamento/dashboard-faturamento.component';
import { TableModule } from 'primeng/table';
import { SharedModule } from "../../shared/shared.module";
import { DashboardRoutingModule } from './dashboard-routing.module';



@NgModule({
    declarations: [
        DashboardFaturamentoComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        NgxEchartsModule.forRoot({
            /**
             * This will import all modules from echarts.
             * If you only need custom modules,
             * please refer to [Custom Build] section.
             */
            echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
        }),
        DropdownModule,
        TableModule,
        SharedModule,

    ]
})
export class DashboardModule { }
