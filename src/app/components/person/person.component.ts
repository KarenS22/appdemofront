import { Component } from '@angular/core';
import { Person, PersonData } from '../../models/person';
import { PersonService } from '../../services/person.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-person',
  imports: [CommonModule, FormsModule],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss'
})

export class PersonComponent {
  autor: PersonData = { name: '', cedula: '', institucion: '' }; 
  personas: Person[] = [];

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.list();
  }

  save(): void {
    if (this.autor.name.trim() && this.autor.cedula.trim() && this.autor.institucion.trim()) {
      this.personService.addPerson(this.autor).subscribe(() => {
        console.log('Autor guardado');
        this.autor = { name: '', cedula: '', institucion: '' }; 
        this.list(); 
      });
    } else {
      alert('Debe completar todos los campos.');
    }
  }

  list(): void {
    this.personService.getPersons().subscribe({
      next: (data) => this.personas = data,
      error: (err) => console.error('Error al obtener personas', err)
    });
  }
}

