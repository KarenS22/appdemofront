export interface Libro {
    id: number;
    nombre: string;
    autor: string;
    anioPublicacion: number;
    descripcion?: string;
    imagenUrl?: string;
}
export interface LibroData {
    nombre: string;
    autor: string;
    anioPublicacion: number;
    descripcion?: string;
    imagen: File | null;
}