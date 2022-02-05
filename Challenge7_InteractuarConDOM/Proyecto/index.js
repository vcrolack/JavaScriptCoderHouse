class Biblioteca {

  constructor (capacidad) {
    this.capacidad = capacidad;
    this.libros = [];
    this.librosNoLeidos = [];
    this.librosLeidos = [];
  }

  agregarLibro(libro) {
    if (this.capacidad <= this.capacidad) {

      this.libros.push(libro);
      this.librosNoLeidos.push(libro);
      alert(`Has agregado con éxito el libro de ${libro.nombre}. Tienes ${this.libros.length} dentro de una biblioteca con una capacidad máxima de ${this.capacidad} de libros.`)
      
      //INTERACTUANDO CON EL DOM
      let listaLibros = document.getElementById("libros-agregados");
      for (const libro of this.libros) {
        let li = document.createElement("li");
        li.innerHTML = libro.nombre;
        listaLibros.appendChild(li);
      }


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
      alert(`Los libros dentro de la Biblioteca son: \n${nombresLibros.join('\n')}\nY la cantidad de libros es de ${this.libros.length}`);
    } else {
      alert('No tienes libros en tu biblioteca personal.');
    }
  }

  verLibrosLeidos() {
    const nombresLibros = [];

    for (const nombreLibro in this.librosLeidos) {
      nombresLibros.push(this.librosLeidos[nombreLibro].nombre);
    }

    if (nombresLibros.length > 0) {
      alert(`Los libros leídos en tu biblioteca son:\n${nombresLibros.join('\n')}\nY son un total de ${this.librosLeidos.length} libros leídos.`);
    } else {
      alert('No has leído ningún libro. ¡Ponte a leer, eh!');
    }
  }

  verLibrosNoLeidos () {
    const nombresLibros = [];

    for (const nombreLibro in this.librosNoLeidos) {
      nombresLibros.push(this.librosNoLeidos[nombreLibro].nombre);
    }

    if (nombresLibros.length > 0) {
      alert(`Los libros leídos en tu biblioteca son:\n${nombresLibros.join('\n')}\n Y tienes un total de ${this.librosNoLeidos.length} de libros por leer.`);
    } else {
      alert('No tienes ningún libro pendiente. ¡Prueba con agregar una nueva lectura emocionante!');
    }
  }

  cantidadPaginasTotal() {
    let cantidadPaginas = 0;
    for (const pagina in this.libros) {
      cantidadPaginas = cantidadPaginas + this.libros[pagina].paginas;
    }
    console.log(cantidadPaginas);
    alert(`En tu Biblioteca Personal existe un total de ${cantidadPaginas}`);
  }

  libroLeido (nombreLibro) {
    this.librosNoLeidos.forEach((libro, index) =>{

      if (nombreLibro === libro['nombre']) {
        
        this.librosLeidos.push(libro);
        this.librosNoLeidos.splice(index, 1);
        alert(`¡Has agregado ${nombreLibro} a tu lista de libros leídos!`);

      } else {
        alert(`El libro ${nombreLibro} no fue encontrado.`);
      }
    })
  }


}
class Libro {

  constructor(nombre, autor, paginas, annio, leido) {
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

class BibliotecaUI {

  bibliotecaPersonal = new Biblioteca(10);
  constructor () {}
  
  ejecutarInterfaz () {
    //const bibliotecaPersonal = new Biblioteca(10);
    alert('Bienvenido a tu Biblioteca Personal');
    let estasDentro = true;
    while (estasDentro) {
      const eleccionUsuario = parseInt(prompt('¿Qué desea hacer?\n1. Agregar libro\n2. Quitar libro\n3. Detalle libro\n4. Ver  libros\n5. Total de paginas\n6. Marcar libro como leído\n7. Ver libros leídos\n8. Ver libros no leídos\n0. Salir\nIntroduzca opcion:'))
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
        case 5:
          this.bibliotecaPersonal.cantidadPaginasTotal();
          break;
        case 6:
          this.marcarLibroComoLeido();
          break;
        case 7:
          this.verLibrosLeidos();
          break;
        case 8:
          this.verLibrosNoleidos();
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

    const libro = new Libro(nombreLibro.toUpperCase(), autor.toUpperCase(), paginas, annio, false);
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

  verCantidadPaginasLeidas() {
    this.bibliotecaPersonal.cantidadPaginasTotal();
  }

  verLibros() {
    this.bibliotecaPersonal.verLibros();
  }

  verLibrosLeidos() {
    this.bibliotecaPersonal.verLibrosLeidos();
  }

  verLibrosNoleidos() {
    this.bibliotecaPersonal.verLibrosNoLeidos();
  }

  marcarLibroComoLeido () {
    const nombreLibro = prompt('Escribe el nombre del libro que has leído: ');
    this.bibliotecaPersonal.libroLeido(nombreLibro.toUpperCase());
  }
}


//Creacion de la "interfaz grafica" de la aplicacion.
const UI = new BibliotecaUI();
UI.ejecutarInterfaz();