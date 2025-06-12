import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LibroComponent } from "./components/libro/libro.component";

@Component({
  selector: 'app-root',
  imports: [LibroComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'appdemo';
}
