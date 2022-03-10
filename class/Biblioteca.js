import {Libro} from './Libro.js'
export class Biblioteca {

  constructor (capacidad) {
    this.capacidad = capacidad;
    this.libros = [];
  }

  agregarLibro(libro) {
    if (this.capacidad <= this.capacidad) {
      
      this.libros.push(libro);
      
      let usuario = JSON.parse(localStorage.getItem('usuario'));
      usuario.biblioteca.libros.push(libro);
      localStorage.setItem('usuario', JSON.stringify(usuario)); 
      
      //se actualizan los libros en el local storage
      let usuarioActualizado =  JSON.parse(localStorage.getItem('usuario'));
      let bibliotecaActualizada = usuarioActualizado.biblioteca.libros;

      //funcion agregar a bd
      this.agregarBaseDatos(bibliotecaActualizada);

    } else {
      console.log('No caben más libros.')
    }
  }

  agregarBaseDatos (arrayLibros) {

    let usuario = JSON.parse(localStorage.getItem('usuario'));
    let idUsuario = usuario.id;
    
    //Se actualiza los libros del usuario con un PATCH
    fetch(`http://localhost:3000/users/${idUsuario}`, {
      method: 'PATCH',
      body: JSON.stringify({
        biblioteca: {
          capacidad: this.capacidad,
          libros: arrayLibros
        }
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => console.log(response))
      .catch(err => console.log(err))
  } 

  //Todos los libros 
  listaLibrosDOM() {
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    let librosStorage = usuario.biblioteca.libros;
    let libros;

    if (librosStorage) {

      libros = librosStorage

    } else {

      libros = this.libros;

    }

    this.renderLibros(libros);
  }

  renderLibros(libros) {
    for (let libro of libros) {
      let leido;
      let claseLeido;
      let textoBoton;

      // Se comprueba si el libro ha sido leído o no para pasar los estilos y el texto del botón
      if (libro.leido) {

        leido = 'Sí';
        claseLeido = 'btn-warning';
        textoBoton = 'No leído'

      } else {

        leido = 'No';
        claseLeido = 'btn-success';
        textoBoton = 'Leído';

      }

      $('#libros-agregados').append(`
        <div class="card bg-dark" id=${libro.id} style="width:18rem;">
          <div class="card-body">
            <h5 class="card-title"> ${libro.nombre} </h5>
            <h6 class="card-subtitle"> Autor: ${libro.autor} </h6>
            <ul>
              <li> Páginas: ${libro.paginas} </li>
              <li> Año de edición: ${libro.annio} </li>
              <li> Leído: ${leido} </li>
            </ul>
            <div class="d-flex justify-content-between">
              <button class="btn ${claseLeido} btn-change-status"> ${textoBoton} </button>
              <button class="btn btn-danger btn-eliminar"> Eliminar </button>
            </div>
          </div>
        </div>
      `)
    }
  }

  crearLibro(idLibro) {
    const nombreLibro = $('#nombre-libro').val();
    const autor = $('#nombre-autor').val();
    const paginas = $('#num-paginas').val();
    const annio = $('#annio-edicion').val();

    if (this.libros.length < this.capacidad ) {

      let libro = new Libro(idLibro, nombreLibro.toUpperCase(), autor.toUpperCase(), paginas, annio, false);
      this.agregarLibro(libro);

    } else {
      $('#ui-error').append(`
      <div class="alert alert-danger">
        <p class="text-danger> Error al agregar el libro. </p>
      </div>
      `);
    }
  }

  eliminarLibro (usuario, idLibro) {
    let bibliotecaActualizada;
    // Se realiza un get para obtener al usuario primero, ya que queremos acceder a su biblioteca
    $.getJSON(`http://localhost:3000/users/${usuario.id}`, function (res, sta) {
      if (sta === 'success') {
        let libros = res.biblioteca.libros;
        bibliotecaActualizada = libros.filter(libro => libro.id != idLibro);
        //realizamos un PATCH para actualizar la biblioteca del usuario para quitar el libro
        fetch(`http://localhost:3000/users/${usuario.id}`, {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json; charset=UTF-8'},
          body: JSON.stringify({
            biblioteca: {
              capacidad: usuario.biblioteca.capacidad,
              libros: bibliotecaActualizada
            }
          }),
        })
          .then(res => {
            //Se realiza este GET para actualizar los datos del local storage
            $.getJSON(`http://localhost:3000/users/${usuario.id}`, function (res, sta) {
              if (sta === 'success') {
                localStorage.setItem('usuario', JSON.stringify(res));
              }
            })
          })
          .catch(err => console.log(err))
      }
    })
  }

  libroLeido(usuario, idLibro) {
    //Se realiza un GET para obtener el usuario 
    $.getJSON(`http://localhost:3000/users/${usuario.id}`, function (res, sta) {
      if (sta === 'success') {

        let libros = res.biblioteca.libros;

        libros.map(libro => {
          if (libro.id == idLibro) {

            if(libro.leido) {
              libro.leido = false;
            } else {
              libro.leido = true;
            }
          }

        })

        //Se realiza un PATCH para actualizar la biblioteca con el libro leído o desmarcado como leído
        fetch(`http://localhost:3000/users/${usuario.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json; charset=UTF-8'},
          body: JSON.stringify({
            biblioteca: {
              capacidad: usuario.biblioteca.capacidad,
              libros: libros
            }
          })
        })
          .then(res => {
            //Se realiza GET para actualizar el usuario del local storage
            $.getJSON(`http://localhost:3000/users/${usuario.id}`, function (res, sta) {
              if (sta === 'success') {
                localStorage.setItem('usuario', JSON.stringify(res));
              }
            })
          })
          .catch(err => console.log(err));
      }
    })
  }

  //Filtro para mostrar los libros leídos
  librosLeidos(usuario, biblioteca) {
    let libros;

    /*Se realiza un GET para obtener la biblioteca del usuario y filtrar
     si el estado de leído es igual a true y mostrarlo en el dashboard */
    $.getJSON(`http://localhost:3000/users/${usuario.id}`, function (res, sta) {
      if (sta === 'success') {

        libros = res.biblioteca.libros;
        libros = libros.filter(libro => libro.leido === true);
        biblioteca.renderLibros(libros);

      }
    })
  }

  //Filtro para mostrar los libros no leídos 
  librosNoLeidos(usuario, biblioteca) {
    let libros;
    
    /* Se realiza un GET para obtener la biblioteca del usuario y filtrar
    si el estado de leído es distinto a true y mostrarlo en el dashboard */
    $.getJSON(`http://localhost:3000/users/${usuario.id}`, function (res, sta) {
      if (sta === 'success') {
        libros = res.biblioteca.libros;
        libros = libros.filter(libro => libro.leido != true);
        biblioteca.renderLibros(libros);
      }
    })
  }

  //Remueve todas las cards del dashboard
  limpiarDashboard () {
    $('.card').remove();
  }
}