export class Biblioteca {

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
      this.listaLibrosDOM(libro);
      console.log(this.libros)
      localStorage.setItem('libros', JSON.stringify(this.libros));

    } else {
      alert('Ya no caben más libros.');
    }
  }

  renderLibros (libros) {
    
  }

  listaLibrosDOM(libro) {
    let listaLibros = document.getElementById("libros-agregados");
    listaLibros.innerHTML= '';

    let storageLibros = localStorage.getItem('libros');
    let arrayLibros = JSON.parse(storageLibros);
    let libros;
    if (arrayLibros) {
      libros = arrayLibros
    } else {
      libros = this.libros;
    }

    for (let libro of libros) {
      //creacion divs
      let card = document.createElement("div");
      let cardBody = document.createElement("div");
      let containerBotones = document.createElement("div");

      //asignacion de clases
      card.className = 'card bg-dark';
      card.style = 'width: 300px;';
      cardBody.className = 'card-body';
      containerBotones.className = "container-card-botones";

      //creacion header card
      let cardTitle = document.createElement("h5");
      let cardSubtitle = document.createElement("h6");

      //creacion lista
      let ul = document.createElement("ul");
      let liPaginas = document.createElement("li");
      let liAnnio = document.createElement("li");
      let liLeido = document.createElement("li");

      //creacion botones
      let btnEliminar =  document.createElement("button");
      let btnLeido = document.createElement("button");

      //clases botones
      btnEliminar.className = 'btn btn-danger';
      if (libro.leido) {
        btnLeido.className ='btn btn-success';
      } else {
        btnLeido.className = 'btn btn-warning';
      }
      
      //set atributos a los botones
      btnEliminar.setAttribute('onclick', `handleEliminarLibro(${libro.id})`);
      
      //creacion contenido
      cardTitle.innerHTML = libro.nombre;
      cardSubtitle.innerHTML = `Autor: ${libro.autor}`;
      liPaginas.innerHTML = `Páginas: ${libro.paginas}`;
      liAnnio.innerHTML = `Año de edición: ${libro.annio}`;
      if (libro.leido) {
        liLeido.innerHTML = `Leído: Sí`
      } else {
        liLeido.innerHTML = 'Leído: No'
      }
      if (libro.leido) {
        btnLeido.innerHTML = 'leído';
      } else {
        btnLeido.innerHTML ='No leído';
      }
      btnEliminar.innerHTML = 'Eliminar';

      //creacion card
      listaLibros.appendChild(card);
      card.appendChild(cardBody);
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardSubtitle);
      cardBody.appendChild(ul);
      ul.appendChild(liPaginas);
      ul.appendChild(liAnnio);
      ul.appendChild(liLeido);
      cardBody.appendChild(containerBotones);
      containerBotones.appendChild(btnLeido);
      containerBotones.appendChild(btnEliminar);

    }
  }

  quitarLibro(id) {
    this.libros.forEach((libro, index) => {

      if (id === libro['id']) {

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

  libroLeido (id) {
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

