import { BibliotecaUI } from "./class/BibliotecaUI.js";
import { Usuario } from "./class/Usuario.js";

//Agregar Libro
$(document).ready(
  function () {

    //Creacion de la "interfaz grafica" de la aplicacion.
    const UI = new BibliotecaUI();
    let libroId = 0;
    let usuarioId = 0;
    //Comprobar en el localstorage si existe algun usuario para decidir el dashboard
    existeUsuario();

    //agregar libro con jquery
    $('#agregar-libro-form').submit(
      function (e) {
        e.preventDefault();
        libroId += 1;
        UI.crearLibro(libroId);
        e.target.reset();
      }
    )

    //Agregar usuario con jquery
    $('#agregar-usuario-form').submit(
      function(e) {
        e.preventDefault();
        const nombreUsuario = $('#nombre-usuario').val();
        const contrasena = $('#contrasena').val();

        if (nombreUsuario.length > 3 && contrasena.length > 4) {
          usuarioId += 1;
          const usuario = new Usuario(usuarioId, nombreUsuario, contrasena);
          localStorage.setItem('usuario', JSON.stringify(usuario));
          $('#modal-agregar-usuario').modal('toggle');
          $('#btn-crear-usuario').remove();
          existeUsuario();
          
        }
      }
    )

//Verificar si existe usuario en local storage para modificar el header
    function existeUsuario() {

      if (!localStorage.getItem('usuario')) {
        agregarUsuario();
      } else {
        cerrarSesion();
      }
    }

    function mostrarLibrosGuardados () {
      let librosGuardados = JSON.parse(localStorage.getItem('libros'));
      
      if (librosGuardados) {

        UI.bibliotecaPersonal.listaLibrosDOM();

      }
    }

    //Renderizar lista de libros, si es que existe
    let librosStorage = JSON.parse(localStorage.getItem('libros'));
    if (librosStorage) {
      mostrarLibrosGuardados();
    }

    //render logout
    function cerrarSesion () {
      let usuario = JSON.parse(localStorage.getItem('usuario'));
        $('#autenticacion').append(`<p id="credencial">Hola, ${usuario.nombre}</p>`)
        $('#autenticacion').append(`<button id="btn-salir" class="btn btn-lg btn-block btn-danger" type="button">Salir</button>`);
        $('#btn-salir').click(
        function (e) {
          localStorage.clear();
          $('#credencial').remove();
          $('#btn-salir').remove();
          agregarUsuario();
        }
      )
    }

    //render agregar usuario
    function agregarUsuario() {
      if (!localStorage.getItem('usuario')) {

        $('#autenticacion').append(`<button 
                                      id="btn-crear-usuario"
                                      type="button" 
                                      class="btn btn-secondary" 
                                      data-bs-toggle="modal" 
                                      data-bs-target="#modal-agregar-usuario"
                                    >
                                      Agregar usuario
                                    </button>`
                                    );
      } 
    }
    //animaciones con JQUERY
    $('#main').prepend('<div id="subtitle" class="text-center my-5"> <h2>Tus lecturas </h2> </div>');
    $('#subtitle').hide();
    $('#subtitle').fadeIn(2000);
  }
)