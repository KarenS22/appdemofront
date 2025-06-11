export interface Libro {
    id: number;
    titulo: string;
    autor: string;
    anioPublicacion: number;
    descripcion?: string;
    imagenUrl?: string;
}
export interface LibroData {
    titulo: string;
    autor: string;
    anioPublicacion: number;
    descripcion?: string;
    imagen: File | null;
}