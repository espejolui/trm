import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { GetDolarDataService } from '../service/get-dolar.service';


@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent implements OnInit {
  public chart!: Chart;
  public dolarData: any;
  public days: any;
  public value: any;

  constructor(private getDolarDataService: GetDolarDataService) {
    this.getDolarDataService.getDolarData().subscribe((data) => {
      this.dolarData = data;

      const lastMonth = data.slice(1, 31);

      // Mapeando los valores del último mes
      this.days = lastMonth.map((item: { vigenciahasta: string }) =>
        item.vigenciahasta.slice(0, 10)
      );

      this.value = lastMonth.map((item: { valor: string }) => item.valor);

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
            backgroundColor: 'rgba(0, 0, 255, 0.1)', // Color del área bajo la línea
            pointBackgroundColor: 'blue', // Color de los puntos
            pointRadius: 1, // Tamaño de los puntos
            borderWidth: 2,
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

  ngOnInit(): void {}
}
