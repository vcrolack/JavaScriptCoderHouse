import { BibliotecaUI } from "./class/BibliotecaUI.js";
import { Usuario } from "./class/Usuario.js";

//Agregar Libro
let agregarLibroForm = document.getElementById("agregar-libro-form");
agregarLibroForm.addEventListener("submit", handleCrearLibro);

function handleCrearLibro(e) {
  e.preventDefault();
  libroId += 1;
  UI.crearLibro(libroId);
  e.target.reset();
}    

//Agregar usuario
let agregarUsuarioForm = document.getElementById("agregar-usuario-form");
agregarUsuarioForm.addEventListener("submit", handleAgregarUsuario);

function handleAgregarUsuario(e) {
  const nombreUsuario = document.getElementById("nombre-usuario").value;
  const contrasena = document.getElementById("contrasena").value;

  if (nombreUsuario.length > 3 && contrasena.length > 4) {
    usuarioId += 1;
    let usuario = new Usuario(usuarioId, nombreUsuario, contrasena); 
    localStorage.setItem('usuario', JSON.stringify(usuario));
    
  } else {
    console.log('data invalida')
  }

}

//Verificar si existe usuario en local storage para modificar el header
function existeUsuario() {
  let containerAgregarUsuario = document.getElementById("autenticacion");

  if (!localStorage.getItem('usuario')) {

    let botonAgregarUsuario = document.createElement("button");
    botonAgregarUsuario.className = 'btn btn-secondary';
    botonAgregarUsuario.setAttribute('type', 'button');
    botonAgregarUsuario.setAttribute('data-bs-toggle', "modal");
    botonAgregarUsuario.setAttribute('data-bs-target', '#modal-agregar-usuario');
    botonAgregarUsuario.innerHTML = "Agregar usuario";
    containerAgregarUsuario.appendChild(botonAgregarUsuario);

  } else {

    let usuario = localStorage.getItem('usuario');
    let usuarioJSON = JSON.parse(usuario);
    let botonSalir = document.createElement("button");
    botonSalir.className = "btn btn-danger"
    botonSalir.setAttribute('type', 'button');
    botonSalir.setAttribute('id', 'boton-salir');
    botonSalir.innerHTML = 'Salir';
    console.log(usuario)
    let p = document.createElement("p");
    p.className = 'me-4';
    p.innerHTML = `Hola, ${usuarioJSON.nombre}`;
    containerAgregarUsuario.appendChild(p);
    containerAgregarUsuario.appendChild(botonSalir);

  }
}

function mostrarLibrosGuardados () {
  let librosGuardados = JSON.parse(localStorage.getItem('libros'));
  
  if (librosGuardados) {

    UI.bibliotecaPersonal.listaLibrosDOM();

  }
}



//Creacion de la "interfaz grafica" de la aplicacion.
const UI = new BibliotecaUI();
let libroId = 0;
let usuarioId = 0;

//Comprobar en el localstorage si existe algun usuario para decidir el dashboard
existeUsuario();

//Renderizar lista de libros, si es que existe
let librosStorage = JSON.parse(localStorage.getItem('libros'));
if (librosStorage) {
  mostrarLibrosGuardados();
}

//Salir de la sesion borrando el local storage
function handleSalirBoton(e) {
  localStorage.clear();
  document.location.reload();
}

if (document.getElementById("boton-salir")) {
  let botonSalir = document.getElementById("boton-salir");
  botonSalir.addEventListener("click", handleSalirBoton);
}