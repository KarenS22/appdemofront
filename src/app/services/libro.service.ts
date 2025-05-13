import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/enviroment'; 
import { Libro, LibroData } from '../models/libros';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private http: HttpClient = inject(HttpClient);
  private API = environment.apiEndpoint;

  constructor() { }

  addLibro(libro: LibroData): Observable<Libro> {
    return this.http.post<Libro>(`${this.API}`, libro);
  }
  getLibro(id: Number): Observable<Libro> {
    return this.http.get<Libro>(`${this.API}${id}`);
  }

  getLibrosByTitulo(titulo: string): Observable<Libro[]> {
  return this.http.get<Libro[]>(`${this.API}titulo`, {
    params: { q: titulo }
  });
}

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.API}all`);
  }

  actualizarLibro(id: Number, libro: LibroData): Observable<Libro> {
    return this.http.put<Libro>(`${this.API}${id}`, libro);
  }

  eliminarLibro(id: Number): Observable<Libro> {
    return this.http.delete<Libro>(`${this.API}${id}`);
  }
}
