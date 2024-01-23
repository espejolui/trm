import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common'; // Usado para formatear valores
import { DateService } from '../service/date.service';

@Component({
  selector: 'getDolar',
  standalone: true,
  imports: [HttpClientModule, DecimalPipe, FormsModule],
  templateUrl: './get-dolar.component.html',
  styleUrl: './get-dolar.component.css'
})
export class GetDolarComponent implements OnInit {

  public titlePage: string;
  public dolarData!: { value: number, currency: string };
  public dolarInput: number;
  public pesoInput: number;


  constructor(private http: HttpClient) {
    this.titlePage = "Para hoy",
      this.dolarData = { value: 0, currency: '' },
      this.dolarInput = 0,
      this.pesoInput = 0
  }

  // Obteniendo el servicio del formato de la fecha
  getDateFormatted = () => DateService();


  // Obteniendo datos con HttpClient del banco de la república
  getDolar = () => {
    this.http.get("https://www.datos.gov.co/resource/32sa-8pi3.json").subscribe({
      next: (data: any) => {
        const currentDay = data[1]; // 18
        const nextDay = data[0]; // 19

        const currentDate = new Date().toLocaleDateString("es-CO", { timeZone: "America/Bogota" });
        const apiDate = new Date(nextDay.vigenciahasta).toLocaleDateString("es-CO", { timeZone: "America/Bogota" });

        if (currentDate === apiDate) {
          this.dolarData = { value: currentDay.valor, currency: currentDay.unidad };
        } else {
          this.dolarData = { value: nextDay.valor, currency: nextDay.unidad };
        }
      },
      error: (error: string) => {
        alert(error);
      },
      complete: () => {
        console.log("Función finalizada");
      }
    });
  };

  DolarPeso = () => {
    const result = this.dolarInput * this.dolarData.value
    return result
  }

  pesoDolar = () => {
    const result = this.pesoInput / this.dolarData.value
    return result
  }

  // Con el fin de cargar la función una vez se cargue el componente
  ngOnInit() {
    this.getDolar();
  }
}