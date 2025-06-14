import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Libro, LibroData } from '../models/libros';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  private http: HttpClient = inject(HttpClient);
  // private API = 'http://34.27.70.206:3000/libros/';
  private API = 'http://localhost:3000/libros/';

  constructor() {}

  addLibro(
    libro: LibroData,
    imagen: File,
    pdf: File | null
  ): Observable<Libro> {
    const formData = new FormData();
    formData.append('imagen', imagen);

    if (pdf) formData.append('pdf', pdf);
    formData.append('nombre', libro.nombre);
    formData.append('autor', libro.autor);
    formData.append('descripcion', libro.descripcion!);
    formData.append('anioPublicacion', libro.anioPublicacion.toString());
    return this.http.post<Libro>(this.API, formData);
  }

  getLibro(id: Number): Observable<Libro> {
    return this.http.get<Libro>(`${this.API}${id}`);
  }

  getLibrosByTitulo(nombre: string): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.API}nombre/${nombre}`, {
      params: { q: nombre },
    });
  }

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.API}`);
  }

  actualizarLibro(id: Number, libro: LibroData): Observable<Libro> {
    return this.http.put<Libro>(`${this.API}${id}`, libro);
  }

  eliminarLibro(id: Number): Observable<Libro> {
    return this.http.delete<Libro>(`${this.API}${id}`);
  }
}
