import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RateComponent } from './rate/rate.component';
import { ChartComponent } from './chart/chart.component';
import { CalculatorComponent } from './calculator/calculator.component';


@Component({
  selector: 'app',
  standalone: true,
  imports: [RouterOutlet, RateComponent, ChartComponent, CalculatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'TRM Colombia';
}
