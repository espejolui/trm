import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common'; // Usado para formatear valores
import { DateService } from '../service/date.service';
import { GetDolarDataService } from '../service/get-dolar.service';

@Component({
  selector: 'rate',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './rate.component.html',
  styleUrl: './rate.component.css',
})
export class RateComponent implements OnInit {
  public titlePage: string = 'Para hoy';
  public dolarValue!: string;

  constructor(private getDolarDataService: GetDolarDataService) {}

  // 1. Obteniendo el servicio del formato de la fecha para el titulo
  getDateFormatted = () => DateService();

  // 2. El valor del dolar según el día calendario
  rate() {
    this.getDolarDataService.getDolarData().subscribe({
      next: (data: any) => {
        const nextDay = new Date(data[0].vigenciadesde).toLocaleDateString(
          'es-CO',
          { timeZone: 'America/Bogota' }
        );

        // 3. Esto representa el día actual en Colombia formateado
        const currentDate = new Date().toLocaleDateString('es-CO', {
          timeZone: 'America/Bogota',
        });

        // 4. Si la fecha actual es igual al siguiente día, renderiza el indice [0], pero si no se cumple renderiza el indice [1]
        if (currentDate === nextDay) {
          this.dolarValue = data[1].valor;
        } else {
          this.dolarValue = data[0].valor;
        }
      },
      error(err: string) {
        alert(err);
      },
    });
  }

  // 5. Con el fin de cargar la función una vez se cargue el componente
  ngOnInit() {
    this.rate();
  }
}
