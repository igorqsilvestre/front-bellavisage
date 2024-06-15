import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { DropdownModule } from 'primeng/dropdown';

import { DashboardFaturamentoRoutingModule } from './dashboard-faturamento-routing.module';
import { DashboardFaturamentoComponent } from './dashboard-faturamento.component';
import { TableModule } from 'primeng/table';
import { SharedModule } from "../../shared/shared.module";



@NgModule({
    declarations: [
        DashboardFaturamentoComponent
    ],
    imports: [
        CommonModule,
        DashboardFaturamentoRoutingModule,
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
export class DashboardFaturamentoModule { }
