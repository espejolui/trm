import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common'; // Usado para formatear valores
import { GetDolarDataService } from '../service/get-dolar.service';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
})
export class CalculatorComponent {
  public dolarInput: number = 1;
  public dolarValue!: number;

  constructor(private getDolarDataService: GetDolarDataService) {
    this.getDolarDataService.getDolarData().subscribe((data) => {
      const today = new Date().toLocaleDateString('es-CO', {
        timeZone: 'America/Bogota',
      });
      const apiDay = new Date(data[0].vigenciadesde).toLocaleDateString(
        'es-CO',
        { timeZone: 'America/Bogota' }
      );

      if (today !== apiDay) {
        this.dolarValue = data[0].valor;
      } else {
        this.dolarValue = data[1].valor;
      }
    });
  }

  dolarPeso = () => {
    const result = this.dolarInput * this.dolarValue;
    return result;
  };
}
