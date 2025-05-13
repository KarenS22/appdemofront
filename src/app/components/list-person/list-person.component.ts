import { Component } from '@angular/core';
import { Person } from '../../models/person';
import { PersonService } from '../../services/person.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-person',
  imports: [CommonModule, FormsModule],
  templateUrl: './list-person.component.html',
  styleUrl: './list-person.component.scss'
})
export class ListPersonComponent {
  personas: Person[] = [];

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.personService.getPersons().subscribe({
      next: (data) => this.personas = data,
      error: (err) => console.error('Error al obtener personas', err)
    });
  }

}
