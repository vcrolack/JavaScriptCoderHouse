export class Usuario {
  constructor (id, nombre, contrasena, biblioteca) {
    this.id = id;
    this.nombre = nombre;
    this.contrasena = contrasena;
    this.biblioteca = biblioteca;
  }

  obtenerUsuarios () {
    fetch('http://localhost:3000/users')
    .then(res => console.log(Response));
  }
}