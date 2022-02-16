import {Biblioteca} from './Biblioteca.js';
import {Libro} from './Libro.js';

export class BibliotecaUI {
  bibliotecaPersonal = new Biblioteca(10);
  constructor () {}

  crearLibro(idLibro) {
    const nombreLibro = document.getElementById("nombre-libro").value;
    const autor = document.getElementById("nombre-autor").value;
    const paginas = document.getElementById("num-paginas").value;
    const annio = document.getElementById("annio-edicion").value;
    let error = document.getElementById('ui-error');
    error.innerHTML ='';

    if (this.bibliotecaPersonal.libros.length < this.bibliotecaPersonal.capacidad ) {

      let libro = new Libro(idLibro, nombreLibro.toUpperCase(), autor.toUpperCase(), paginas, annio, false);
      this.bibliotecaPersonal.agregarLibro(libro);
            
    } else {
      
      let containerError = document.createElement('div');
      containerError.className = 'alert alert-danger';
      containerError.setAttribute('role', 'alert');
      let p = document.createElement('p');
      p.className = 'text-danger';
      p.innerHTML = '¡No caben más libros!';
      error.appendChild(containerError);
      containerError.appendChild(p);

    }
  }
}