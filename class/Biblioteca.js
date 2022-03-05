import {Libro} from './Libro.js'
export class Biblioteca {

  constructor (capacidad) {
    this.capacidad = capacidad;
    this.libros = [];
  }

  agregarLibro(libro) {
    if (this.capacidad <= this.capacidad) {
      
      this.libros.push(libro);
      console.log(this.libros);
      let usuario = JSON.parse(localStorage.getItem('usuario'));
      usuario.biblioteca.libros.push(libro);
      console.log(usuario)
      localStorage.setItem('usuario', JSON.stringify(usuario));
      console.log(localStorage.getItem('usuario'))
      let usuarioActualizado =  JSON.parse(localStorage.getItem('usuario'));
      let bibliotecaActualizada = usuarioActualizado.biblioteca.libros;

      
      //funcion agregar a bd
      this.agregarBaseDatos(bibliotecaActualizada);

    } else {
      alert('Ya no caben más libros.');
    }
  }

  agregarBaseDatos (arrayLibros) {

    let usuario = JSON.parse(localStorage.getItem('usuario'));
    let idUsuario = usuario.id;



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

  listaLibrosDOM(libro) {
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    let librosStorage = usuario.biblioteca.libros;
    let libros;
    if (librosStorage) {
      libros = librosStorage
    } else {
      libros = this.libros;
    }

    for (let libro of libros) {
      let leido;
      let claseLeido;
      let textoBoton;
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
              <button class="btn ${claseLeido}"> ${textoBoton} </button>
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
    $.getJSON(`http://localhost:3000/users/${usuario.id}`, function (res, sta) {
      if (sta === 'success') {
        let libros = res.biblioteca.libros;
        bibliotecaActualizada = libros.filter(libro => libro.id != idLibro);
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

  limpiarDashboard () {
    $('.card').remove();
  }
}

