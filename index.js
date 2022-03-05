import { Biblioteca } from "./class/Biblioteca.js";
import { Usuario } from "./class/Usuario.js";

//Agregar Libro
$(document).ready(
  function () {

    //errores
    $('#ui-error-agregar-usuario1').append(
      `<div class="alert alert-danger">
        <p class="text-danger"> Ingrese bien los campos. El nombre y la contraseña debe de tener una longitud mayor a 3 caracteres.</p>
      </div>`
    )
    $('#ui-error-agregar-usuario2').append(
      `<div class="alert alert-danger">
        <p class="text-danger"> El nombre de usuario no está disponible </p>
      </div>`
    )
    $('#ui-error-agregar-usuario1').hide();
    $('#ui-error-agregar-usuario2').hide();


    const bibliotecaPersonal = new Biblioteca(10);

    let libroId = 0;
    if (JSON.parse(localStorage.getItem('usuario'))) {
      let usuario = JSON.parse(localStorage.getItem('usuario'));
      if (usuario.biblioteca.libros) {
        $.getJSON(`http://localhost:3000/users/${usuario.id}`, function (res, sta) {
          libroId = res.biblioteca.libros.length - 1 + 1
          console.log(res.biblioteca.libros)
      })
      }

    }
    let usuarioId = 0;
    $.getJSON("http://localhost:3000/users", function (res, sta) {
      usuarioId = res.length-1;
    })
    //Comprobar en el localstorage si existe algun usuario para decidir el dashboard
    existeUsuario();

    //agregar libro con jquery
    $('#agregar-libro-form').submit(
      function (e) {
        e.preventDefault();
        libroId += 1;
        bibliotecaPersonal.crearLibro(libroId);
        e.target.reset();
      }
    )

    //Iniciar sesion
    $('#iniciar-sesion-form').submit(
      function (e) {
        e.preventDefault();
        const nombreUsuario = $("#nombre-iniciar-sesion").val();
        const contrasena = $("#contrasena-iniciar-sesion").val();
        iniciarSesion(nombreUsuario, contrasena);
      }
    )

    //Agregar usuario con jquery
    $('#boton-agregar-usuario').click(
      function(e) {
        e.preventDefault();
        const nombreUsuario = $('#nombre-usuario').val();
        const contrasena = $('#contrasena').val();
        const biblioteca = bibliotecaPersonal;

        if (nombreUsuario.length > 3 && contrasena > 3){
          $.getJSON('http://localhost:3000/users', function (res, sta) {
            if (sta === 'success') {
              
              if (res.find(element => element.nombre === nombreUsuario)) {
                $('#ui-error-agregar-usuario2').show();
                setTimeout(() => $('#ui-error-agregar-usuario2').hide(), 3000);
              } else {
                usuarioId += 1;
                const usuario = new Usuario(usuarioId, nombreUsuario, contrasena, biblioteca);
                console.log(usuario)
                fetch("http://localhost:3000/users", {
                  method: 'POST',
                  body: JSON.stringify(usuario),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                })
                  .then(() => {
                    $('#modal-agregar-usuario').modal('toggle');
                    localStorage.setItem('usuario', JSON.stringify(usuario));
                    $('#btn-crear-usuario').remove();
                    $('#btn-crear-usuario').remove();
                    existeUsuario();
                  })
                  .catch(err => console.log(err))    
              }
            }
  
          });
        } else {
          $('#ui-error-agregar-usuario1').show();
          setTimeout(() => $('#ui-error-agregar-usuario1').hide(), 3000);
        }
      })


//Verificar si existe usuario en local storage para modificar el header
    function existeUsuario() {

      if (!localStorage.getItem('usuario')) {
        agregarUsuario();
      } else {
        cerrarSesion();
        mostrarLibrosGuardados();
      }
    }

    function mostrarLibrosGuardados () {
      let usuario = JSON.parse(localStorage.getItem('usuario'));
      let librosStorage = usuario.biblioteca.libros;
      if (librosStorage) {

        bibliotecaPersonal.listaLibrosDOM();

      }
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
          bibliotecaPersonal.limpiarDashboard();
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
          $('#autenticacion').prepend(
                                    `
                                    <button 
                                    id="btn-iniciar-sesion"
                                    type="button" 
                                    class="btn btn-primary" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#modal-iniciar-sesion"
                                    >
                                      Iniciar sesión
                                    </button>`
        )
      }
    }

    function iniciarSesion (nombreUsuario, contrasena) {
      $.getJSON('db/data.json', function (res, sta) {
        if (sta === 'success') {

          res.users.find(element => {
            if (element.nombre === nombreUsuario && element.contrasena === contrasena) {
              localStorage.setItem('usuario', JSON.stringify(element));

              $('#btn-iniciar-sesion').remove();
              $('#btn-crear-usuario').remove();
              $('#modal-iniciar-sesion').modal('toggle')
              existeUsuario();
            }
          })
        }
      })
    }

    //Eliminar usuario
    $('.btn-eliminar').click(
      function (e) {
        e.preventDefault();
        let idCard = $(this).closest(".card").attr("id");
        let usuario = JSON.parse(localStorage.getItem('usuario'));
        // let idUsuario = usuario.id;
        bibliotecaPersonal.eliminarLibro(usuario, idCard);
      }
    )
    //animaciones con JQUERY
    $('#main').prepend('<div id="subtitle" class="text-center my-5"> <h2>Tus lecturas </h2> </div>');
    $('#subtitle').hide();
    $('#subtitle').fadeIn(2000);
  }
)