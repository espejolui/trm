import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { DecimalPipe } from '@angular/common'; // Usado para formatear valores
import { colDate } from '../../service/date.service';

@Component({
  selector: 'getDolar',
  standalone: true,
  imports: [HttpClientModule, DecimalPipe],
  templateUrl: './get-dolar.component.html',
  styleUrl: './get-dolar.component.css'
})
export class GetDolarComponent implements OnInit {

  titlePage = "La TRM de hoy";
  dolarData!: { value: number; currency: string; };

  constructor(private http: HttpClient) { }

  // Con el fin de cargar la función una vez se cargue el componente
  ngOnInit() {
    this.getDolar();
  }

  // Obteniendo datos con HttpClient
  getDolar = () => {
    this.http.get("https://www.datos.gov.co/resource/32sa-8pi3.json").subscribe({

      next: (data: any) => {
        const today = data[0];
        this.dolarData = { value: today.valor, currency: today.unidad };
      },

      // Manejando el error
      error: (error: string) => {
        console.log("Error al obtener los datos", error);
      },

      complete: () => {
        console.log("Función finalizada")
      }
    }
    );
  };

  getDateFormatted = () => colDate();

}