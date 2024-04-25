import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RateComponent } from './rate/rate.component';


@Component({
  selector: 'app',
  standalone: true,
  imports: [RouterOutlet, RateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'TRM Colombia';
}
