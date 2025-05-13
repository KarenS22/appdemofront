import { Component } from '@angular/core';
import { Person } from '../../models/person';
import { PersonService } from '../../services/person.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-get-person',
  imports: [CommonModule, FormsModule],
  templateUrl: './get-person.component.html',
  styleUrl: './get-person.component.scss'
})
export class GetPersonComponent {
  cedula = '';
  personaEncontrada?: Person;
  error: string = '';

  constructor(private personService: PersonService) {}

  buscar(): void {
    if (!this.cedula.trim()) {
      this.error = 'Debe ingresar una cédula.';
      return;
    }

    this.personService.getPersonByCedula(this.cedula).subscribe({
      next: (data) => {
        this.personaEncontrada = data;
        this.error = '';
      },
      error: () => {
        this.error = 'No se encontró una persona con esa cédula.';
        this.personaEncontrada = undefined;
      }
    });
  }

}
