import { Component, OnDestroy, OnInit } from '@angular/core';
import { FaturamentoService } from '../faturamento.service';
import { TratamentoService } from '../../tratamento/tratamento.service';
import { Tratamento } from '../../tratamento/Tratamento';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-faturamento',
  templateUrl: './faturamento.component.html',
  styleUrl: './faturamento.component.css'
})
export class FaturamentoComponent implements OnInit{
  basicData: any;
  basicOptions: any;
  tratamentos: Tratamento[] | null;
  tratamentoSelecionado: Tratamento | undefined;
  faturamentoMensal: number[] = [];

  constructor(
    private faturamentoService: FaturamentoService,
    private tratamentoService: TratamentoService){}



  ngOnInit() {

      this.atualizaListaDeTratamentos();
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.basicOptions = {
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              },
              x: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              }
          }
      };

      this.inicializarGrafico();
  }

  atualizaListaDeTratamentos(){
    this.tratamentoService.obterTodos().subscribe(dados => {
      if(dados) this.tratamentos = dados;
    });
  }

  atualizarFaturamento(idTratamento: number, ano: number){
    const observables = [];

    for (let mes = 1; mes <= 12; mes++) {
      observables.push(this.faturamentoService.obterFaturamentoMensal(idTratamento, mes, ano));
    }

    forkJoin(observables).subscribe(
      resultados => {
        this.faturamentoMensal = resultados;
        this.inicializarGrafico();
      },
      error => {
        console.error('Erro ao obter faturamento', error);
      }
    );
  }

  onTratamentoChange(evento: DropdownChangeEvent){
   const tratamento = evento.value as Tratamento;
   this.atualizarFaturamento(tratamento.id, new Date().getFullYear());
  }


  inicializarGrafico() {
    this.basicData = {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      datasets: [
        {
          label: 'Faturamento',
          data: this.faturamentoMensal,
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)',
            'rgba(255, 205, 86, 0.2)', 'rgba(201, 203, 207, 0.2)',
            'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)', 'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 159, 64)', 'rgb(75, 192, 192)',
            'rgb(54, 162, 235)', 'rgb(153, 102, 255)',
            'rgb(255, 205, 86)', 'rgb(201, 203, 207)',
            'rgb(75, 192, 192)', 'rgb(54, 162, 235)',
            'rgb(153, 102, 255)', 'rgb(255, 159, 64)',
            'rgb(255, 205, 86)', 'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }
      ]
    };
  }

}
