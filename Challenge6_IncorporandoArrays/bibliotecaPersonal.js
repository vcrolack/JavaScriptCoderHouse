class Biblioteca {

  constructor (capacidad) {
    this.capacidad = capacidad;
    this.libros = [];
  }

  agregarLibro(libro) {
    if (this.capacidad <= this.capacidad) {

      this.libros.push(libro);
      alert(`Has agregado con éxito el libro de ${libro.nombre}. Tienes ${this.libros.length} dentro de una biblioteca con una capacidad máxima de ${this.capacidad} de libros.`)
    
    } else {
      alert('Ya no caben más libros.');
    }
  }

  quitarLibro(nombreLibro) {
    this.libros.forEach((libro, index) => {

      if (nombreLibro === libro['nombre']) {

        this.libros.splice(index,1);
        alert(`El libro ${nombreLibro} ha sido eliminado de la biblioteca`);
        console.log(this.libros)

      } else {
        alert(`El libro ${nombreLibro} no fue encontrado.`)
      }
    })
  }

  detalleLibro(nombreLibro) {
    const libroBuscado = this.libros.find(libro => libro['nombre'] === nombreLibro);
    const detallesLibro = Object.values(libroBuscado);
    alert(`El detalle del libro encontrado en la biblioteca es:\n ${detallesLibro.join('\n')}`);
  }

  verLibros() {
    const nombresLibros = [];

    for (const nombreLibro in this.libros) {
      nombresLibros.push(this.libros[nombreLibro].nombre)
    }

    if (nombresLibros.length > 0) {
      alert(`Los libros dentro de la Biblioteca son: \n${nombresLibros.join('\n')}\nY la cantidad de libros es de ${this.libros.length}`)
    } else {
      alert('No tienes libros en tu biblioteca personal.')
    }
  }

}

class Libro {
  constructor(nombre, autor, paginas, annio) {
    this.nombre = nombre;
    this.autor = autor;
    this.paginas = paginas;
    this.annio = annio;
  }

  verDetalle() {
    alert(`DETALLE LIBRO\nNombre: ${this.nombre}\nAutor: ${this.autor}\nPáginas: ${this.paginas}\nAño: ${this.annio}`);
  }
}

class BibliotecaUI {

  bibliotecaPersonal = new Biblioteca(10);
  constructor () {}
  
  ejecutarInterfaz () {
    //const bibliotecaPersonal = new Biblioteca(10);
    alert('Bienvenido a tu Biblioteca Personal');
    let estasDentro = true;
    while (estasDentro) {
      const eleccionUsuario = parseInt(prompt('¿Qué desea hacer?\n1. Agregar libro\n2. Quitar libro\n3. Detalle libro\n4. Ver  libros\n0. Salir\nIntroduzca opcion:'))
      switch (eleccionUsuario) {

        case 1:
          this.crearLibro();
          break;
        case 2:
          this.quitarLibro();
          break;
        case 3:
          this.detalleLibro();
          break;
        case 4:
          this.verLibros();
          break;
        case 0:
          alert('Gracias por utilizar Biblioteca Personal!');
          estasDentro = false;
          break;
        default:
          alert('Has ingresado una opción equivocada.')

      }
    }
  }

  crearLibro() {
    const nombreLibro = prompt('Nombre libro: ');
    const autor = prompt('Autor: ');
    const paginas = parseInt(prompt('Número de páginas: '));
    const annio = parseInt(prompt('Año de edición: '));

    const libro = new Libro(nombreLibro.toUpperCase(), autor.toUpperCase(), paginas, annio);
    this.bibliotecaPersonal.agregarLibro(libro);
  }

  quitarLibro() {
    const nombreLibro = prompt('Nombre del libro a quitar: ');
    this.bibliotecaPersonal.quitarLibro(nombreLibro.toUpperCase())
  }

  detalleLibro() {
    const nombreLibro = prompt('Introduce el nombre del libro que quieres ver: ');
    this.bibliotecaPersonal.detalleLibro(nombreLibro.toUpperCase());
  }

  verLibros() {
    this.bibliotecaPersonal.verLibros();
  }


  
}

//Creacion de la "interfaz grafica" de la aplicacion.
const UI = new BibliotecaUI();
UI.ejecutarInterfaz();



/*PROBANDO CODIGO */

// const bibliotecaPersonal = new Biblioteca(2);
// const libro1 = new Libro('Percy Jackson 1', 'Rick Riordan', 203, 2006);
// const libro2 = new Libro('El nombre del Viento', 'Patrick Rothfuss', 1300, 2010);
// bibliotecaPersonal.agregarLibro(libro1);
// bibliotecaPersonal.agregarLibro(libro2)
// bibliotecaPersonal.verLibros()
// bibliotecaPersonal.detalleLibro('Percy Jackson 1');
// bibliotecaPersonal.quitarLibro('Percy Jackson 1')