import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Libro, LibroData } from './models/libros';
import { LibroService } from './services/libro.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  libros: Libro[] = [];
  libro: LibroData = {
    nombre: '',
    autor: '',
    anioPublicacion: 0,
    descripcion: '',
    imagen: null,
    pdf: null,
  };

  libroId: number | null = null;
  tituloBuscar: string = '';
  mensaje: string = '';
  error: string = '';
  imagen: File | null = null;
  pdf: File | null = null;
  previewImage: string | ArrayBuffer | null = null;

  constructor(private libroService: LibroService) {}

  ngOnInit(): void {
    this.obtenerLibros();
  }

  onFileSelectedBook(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.imagen = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImage = e.target?.result ?? null;
      };
      reader.readAsDataURL(this.imagen!);
    } else {
      this.imagen = null;
      this.previewImage = null;
    }
  }

  onFileSelectedPDF(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.pdf = event.target.files[0];
    } else {
      this.pdf = null;
    }
  }

  abrirPDF(url: string) {
    window.open(url, '_blank');
  }

  agregarLibro(): void {
    if (
      this.libro.nombre.trim() &&
      this.libro.autor.trim() &&
      this.libro.anioPublicacion &&
      this.imagen !== null
    ) {
      this.libroService
        .addLibro(this.libro, this.imagen, this.pdf)
        .subscribe(() => {
          console.log('Libro guardado');
          this.libro = {
            nombre: '',
            autor: '',
            anioPublicacion: 0,
            descripcion: '',
            imagen: null,
            pdf: null,
          };
          this.imagen = null;
          this.previewImage = null;
          this.libroId = null;
          this.pdf = null;
          this.obtenerLibros();
        });
    }
  }

  buscarLibro() {
    if (this.tituloBuscar.trim()) {
      this.libroService.getLibrosByTitulo(this.tituloBuscar).subscribe({
        next: (data) => {
          this.libros = data;
          this.mensaje = 'Libros encontrados';
        },
        error: (err) => {
          this.error = 'Error al buscar libros';
          console.error('Error al buscar libros', err);
        },
      });
    } else {
      alert('Debe ingresar un título para buscar.');
    }
  }

  buscarLibroPorTitulo(titulo: string) {
    this.libroService.getLibrosByTitulo(titulo).subscribe({
      next: (data) => {
        this.libros = data;
        this.mensaje = 'Libros encontrados';
      },
      error: (err) => {
        this.error = 'Error al buscar libros';
        console.error('Error al buscar libros', err);
      },
    });
  }

  eliminarLibro(id: number) {
    if (confirm('¿Está seguro de que desea eliminar este libro?')) {
      this.libroService.eliminarLibro(id).subscribe({
        next: () => {
          console.log('Libro eliminado');
          this.obtenerLibros();
        },
        error: (err) => {
          this.error = 'Error al eliminar libro';
          console.error('Error al eliminar libro', err);
        },
      });
    }
  }

  editarLibro(libro: Libro) {
    this.libro = {
      nombre: libro.nombre,
      autor: libro.autor,
      anioPublicacion: libro.anioPublicacion,
      descripcion: libro.descripcion || '',
      imagen: null,
      pdf: null,
    };
    this.libroId = libro.id;
  }

  cancelarEdicion(): void {
    this.libro = {
      nombre: '',
      autor: '',
      anioPublicacion: 0,
      descripcion: '',
      imagen: null,
      pdf: null,
    };
    this.libroId = null;
    this.imagen = null;
    this.pdf = null;
    this.previewImage = null;
  }

  actualizarLibro() {
    if (this.libroId !== null) {
      this.libroService.actualizarLibro(this.libroId, this.libro).subscribe({
        next: () => {
          console.log('Libro actualizado');
          this.libro = {
            nombre: '',
            autor: '',
            anioPublicacion: 0,
            descripcion: '',
            imagen: null,
            pdf: null,
          };
          this.libroId = null;
          this.previewImage = null;
          this.imagen = null;
          this.pdf = null;
          this.obtenerLibros();
        },
        error: (err) => {
          this.error = 'Error al actualizar libro';
          console.error('Error al actualizar libro', err);
        },
      });
    } else {
      alert('Debe seleccionar un libro para actualizar.');
    }
  }

  obtenerLibros(): void {
    this.libroService.getLibros().subscribe({
      next: (data) => {
        this.libros = data;
        this.mensaje = 'Libros obtenidos correctamente';
      },
      error: (err) => {
        this.error = 'Error al obtener libros';
        console.error('Error al obtener libros', err);
      },
    });
  }
}
