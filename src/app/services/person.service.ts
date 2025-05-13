import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/enviroment'; 
import { Person, PersonData } from '../models/person';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private http: HttpClient = inject(HttpClient);
  private API = environment.apiEndpoint;

  constructor() { }

  getPerson(id: Number): Observable<Person> {
    return this.http.get<Person>(`${this.API}person/${id}`);
  }
  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.API}person/all`);
  }
  addPerson(person: PersonData): Observable<Person> {
    return this.http.post<Person>(`${this.API}person`, person);
  }

  getPersonByCedula(cedula: string): Observable<Person> {
    return this.http.get<Person>(`${this.API}person/id/${cedula}`);
  }
}
