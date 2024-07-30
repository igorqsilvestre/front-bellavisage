import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { DropdownModule } from 'primeng/dropdown';

import { AppAngularModule } from '../../shared/app-angular.module';
import { AppPrimengModule } from '../../shared/app-primeng.module';
import { SharedModule } from '../../shared/shared.module';
import { DashboardFaturamentoComponent } from './dashboard-faturamento/dashboard-faturamento.component';
import { DashboardRoutingModule } from './dashboard-routing.module';




@NgModule({
    declarations: [
        DashboardFaturamentoComponent
    ],
    imports: [
        AppAngularModule,
        AppPrimengModule,
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
        SharedModule,

    ]
})
export class DashboardModule { }
