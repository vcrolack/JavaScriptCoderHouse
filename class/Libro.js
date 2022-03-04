export class Libro {
  constructor(id, nombre, autor, paginas, annio, leido) {
    this.id = id;
    this.nombre = nombre;
    this.autor = autor;
    this.paginas = paginas;
    this.annio = annio;
    this.leido = leido;
  }

  verDetalle() {
    alert(`DETALLE LIBRO\nNombre: ${this.nombre}\nAutor: ${this.autor}\nPáginas: ${this.paginas}\nAño: ${this.annio}`);
  }

}