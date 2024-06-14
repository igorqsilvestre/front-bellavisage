import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { RodapeComponent } from './rodape/rodape.component';
import { BannerComponent } from './banner/banner.component';
import { CardComponent } from './card/card.component';
import { CardModule } from 'primeng/card';
import { RodapeHomeComponent } from './rodape-home/rodape-home.component';


@NgModule({
  declarations: [
    CabecalhoComponent,
    RodapeComponent,
    BannerComponent,
    CardComponent,
    RodapeHomeComponent,

  ],
  imports: [
    CommonModule,
    CardModule,

  ],
  exports:[
    CabecalhoComponent,
    RodapeComponent,
    BannerComponent,
    CardComponent,
    RodapeHomeComponent

  ]
})
export class SharedModule { }
