import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GetDolarComponent } from './get-dolar/get-dolar.component';
import { ChartComponent } from './chart/chart.component';

@Component({
  selector: 'app',
  standalone: true,
  imports: [RouterOutlet, GetDolarComponent, ChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'TRM Colombia';
}
