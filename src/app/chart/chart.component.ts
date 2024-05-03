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
  public dolarData!: [];
  public date!: string[];
  public dolarValue!: [];

  constructor(private getDolarDataService: GetDolarDataService) {
    this.getDolarDataService.getDolarData().subscribe((data) => {
      this.dolarData = data;

      // Sancando los valores solo del último mes y ordenandolos de izquierda a derecha del más antiguo al más reciente respectivamente.
      const lastMonth = data
        .slice(0, 30)
        .sort(
          (a: any, b: any) =>
            new Date(a.vigenciadesde).getTime() -
            new Date(b.vigenciadesde).getTime()
        );

      // Mapeando los días de lastMonth
      this.date = lastMonth.map((date: { vigenciadesde: string }) => {
        const dateFormat = new Date(date.vigenciadesde).toLocaleDateString(
          'es-CO',
          {
            timeZone: 'America/Bogota',
            month: 'short',
            day: 'numeric',
          }
        );

        return `${dateFormat}`;
      });

      this.dolarValue = lastMonth.map(
        (value: { valor: string }) => value.valor
      );

      // Invoco la creación del grafico para que sea rellenado con los datos
      this.createChart();
    });
  }

  createChart() {
    // Obteniendo los estilos computados en el root
    const styles = window.getComputedStyle(document.documentElement);
    const greenLight = styles.getPropertyValue('--greenLight');
    const greenDark = styles.getPropertyValue('--greenDark');

    this.chart = new Chart('trmChart', {
      type: 'line',
      data: {
        labels: this.date,
        datasets: [
          {
            label: 'Historico último mes',
            data: this.dolarValue,
            borderColor: greenLight, // Color de la línea
            backgroundColor: greenLight, // Color del área bajo la línea
            pointBackgroundColor: greenDark, // Color de los puntos
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
