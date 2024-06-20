import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { InitEditableRow } from 'primeng/table';

@Component({
  selector: 'app-dashboard-faturamento',
  templateUrl: './dashboard-faturamento.component.html',
  styleUrl: './dashboard-faturamento.component.css',

})
export class DashboardFaturamentoComponent{
  private url = "http://localhost:8081/api/v1/dashboard";
  constructor(private http: HttpClient) {
    this.init()
  }

  barSeries: any[] = []
  xAxisData: any[] = []

  async init() {
    const reportPizza = await this.getReportPizza()
    //console.log(reportPizza)
    const pizzaSerie0 = (this.faturamentopizza.series as any[])[0]
    pizzaSerie0.data = reportPizza.map((item: any) => {
      return {
        value: item.valor,
        name: item.nome
      }
    })

    const reportBar = await this.getReportBar()
    //console.log(reportBar)
    this.barSeries = reportBar.map((item: any) => {
      return item.valor
    })
    this.xAxisData = reportBar.map((item: any) => {
      return item.data
    })
  }

  async getReportPizza(): Promise<any[]> {
    const path = 'report-pizza'

    return (await this.http.get(`${this.url}/${path}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).toPromise()) as any[]
  }


  async getReportBar(): Promise<any[]> {
    const path = 'report-bar'

    return (await this.http.get(`${this.url}/${path}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).toPromise()) as any[]
  }



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
        data: this.xAxisData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: this.barSeries,
          type: 'bar'
        }
      ]
    } as EChartsOption
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
