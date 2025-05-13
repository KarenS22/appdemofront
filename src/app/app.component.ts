import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PersonComponent } from "./components/person/person.component";
import { HttpClientModule } from '@angular/common/http';
import { ListPersonComponent } from "./components/list-person/list-person.component";
import { GetPersonComponent } from "./components/get-person/get-person.component";
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
