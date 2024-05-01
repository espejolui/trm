import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { GetDolarDataService } from '../service/get-dolar.service';

@Component({
  selector: 'chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent {
  public chart!: Chart;
  public dolarData: any;
  public days: any;
  public value: any;

  constructor(private getDolarDataService: GetDolarDataService) {
    this.getDolarDataService.getDolarData().subscribe((data) => {
      this.dolarData = data;

      const lastMonth = data.slice(1, 31);
      lastMonth.sort(
        (a: any, b: any) =>
          new Date(a.vigenciahasta).getTime() -
          new Date(b.vigenciahasta).getTime()
      );

      // Mapeando los valores del último mes en lugar de toda la data devuelta
      this.days = lastMonth.map((item: { vigenciahasta: string }) =>
        item.vigenciahasta.slice(0, 10)
      );

      this.value = lastMonth.map((item: { valor: string }) => item.valor);

      // Invoco la creación del grafico para que sea rellenado con los datos
      this.createChart();
    });
  }

  createChart() {
    this.chart = new Chart('trmChart', {
      type: 'line',
      data: {
        labels: this.days,
        datasets: [
          {
            label: 'Historico del dolar',
            data: this.value,
            borderColor: 'green', // Color de la línea
            backgroundColor: 'green', // Color del área bajo la línea
            pointBackgroundColor: 'blue', // Color de los puntos
            pointRadius: 1, // Tamaño de los puntos
            borderWidth: 2, // Groso de la líena
          },
        ],
      },
      options: {
        scales: {
          y: {
            // La pongo en falso para que la curva NO comience en cero, sino que empiece por los valores extraidos de la API en este caso.
            beginAtZero: false,
          },
        },
      },
    });
  }
}
