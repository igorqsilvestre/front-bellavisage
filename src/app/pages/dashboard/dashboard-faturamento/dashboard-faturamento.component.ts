import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-dashboard-faturamento',
  templateUrl: './dashboard-faturamento.component.html',
  styleUrl: './dashboard-faturamento.component.css',

})
export class DashboardFaturamentoComponent{

  faturamento: any;



listaTotalFaturamentoTratamento= [
  {
    id: 1,
    mes: 'Janeiro',
    name: 'Carboxiterapia',
    preco: "150.00",
  },
  {
    id: 2,
    mes: 'Janeiro',
    name: 'Criofequência',
    preco: "200.00",
  },
  {
    id: 3,
    mes: 'Fevereiro',
    name: 'Laser Vênus',
    preco: "100.00",
  },
  {
    id: 4,
    mes: 'Fevereiro',
    name: 'Harmonização Facial',
    preco: "1000.00",
  },
  {
    id: 5,
    mes: 'Janeiro',
    name: 'Radiofrequência',
    preco: "250.00"
  }
]




  //chartTramentoMensalPorProcedimento: any;

  getChartOption() {
    return {
      xAxis: {
        type: 'category',
        data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: this.getData(),
          type: 'bar'
        }
      ]
    } as EChartsOption
  }


  getData() {
    //console.log(this.tratamentoSelecionadoMensalPorProcedimento)

    if(!this.tratamentoSelecionadoMensalPorProcedimento) {
      return []
    }

    if(this.tratamentoSelecionadoMensalPorProcedimento.id === 1) {
      return [90, 80, 70, 60, 50, 40, 30, 20, 10, 0, 10, 20]
    }

    if(this.tratamentoSelecionadoMensalPorProcedimento.id === 2) {
      return [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]
    }

    return [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]
  }

  listaTratamentosMensalPorProcedimento: {
    id: number,
    name: string,
  }[] = [{
    id: 1,
    name: 'Carboxiterapia'
  },
  {
    id: 2,
    name: 'Criofequência'
  },
  {
    id: 3,
    name: 'Laser Vênus'
  },
  {
    id: 4,
    name: 'Harmonização Facial'
  },
  {
    id: 5,
    name: 'Radiofrequência'
  }

]

  tratamentoSelecionadoMensalPorProcedimento: {
    id: number,
    name: string,
  } = null

  listaTratamentosMensalPorProcedimentoOnChange(event: any) {
    this.tratamentoSelecionadoMensalPorProcedimento = null

    setTimeout(() => {
      this.tratamentoSelecionadoMensalPorProcedimento = event.value
    }, 0)

    //this.chartTramentoMensalPorProcedimento.setOption(this.getChartOption())
  }

  // onChartInit(ec: any) {
  //   console.log('onChartInit', ec)
  //   this.chartTramentoMensalPorProcedimento = ec;
  // }

  // Grafico de Pizza
  faturamentopizza: EChartsOption = {
    title: {
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Carboxiterapia' },
          { value: 735, name: 'Criofequência' },
          { value: 580, name: 'Harmonização Facial' },
          { value: 484, name: 'Radiofrequência' },
          { value: 300, name: 'Laser Vênus' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
}
