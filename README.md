# BIBLIOTECA PERSONAL
La presente aplicación fue desarrollada para el curso de Javascript dictado por la plataforma de e-learning CoderHouse.

## Descripción
El objetivo principal de la aplicación desarrollada es la correcta organización y seguimiento de los libros que se han leído y se leerán.
Para ello se ha desarrollado una aplicación con las siguientes tecnologías:
  1. HTML5
  2. CSS3
  3. Bootstap
  4. Javascript
  5. JQuery
  6. Json-server

Para cumplir este objetivo, se creó un sistema de login para que el usuario puede registrarse en la aplicación y tener su propia cuenta con sus propios libros. Una vez logueado, en el dashboard se mostrará los distintos ejemplares que haya leído o leerá. Contará con las opciones de filtrar por leídos, no leídos y mostrar todos. Los libros se mostrarán en cards con información pertinente (nombre del libro, autor, páginas, año de edición y si está leído o no); dentro de la card contará con dos funciones, eliminar y marcar cómo leído o desmarcarlo (según sea el caso).
Si el usuario al entrar en la aplicación no posee libros agregados, puede hacerlo con el botón de "agregar libro", el cual desplegará un modal con los inputs correspondientes a la información pertinente al libro. Una vez que pulse el botón de agregar, este se cargará automáticamente en su dashboar como "no leído".
Por último, el usuario podrá cerrar su sesión pulsando el botón "salir", ubicado en el navbar del header. Cuando lo haga, se limpiará el dashboard y podrá iniciar sesión nuevamente o crear un nuevo usuario.
Cabe destacar que el nombre de usuario no puede repetirse.
### Descripción técnica
Cómo se mencionó, la aplicación utiliza herramientas de desarrollo web, por lo que ha sido maquetado con HTML5, estilizado con CSS3 y se ha dado interacción con el usuario mediante Javascript con su librería JQuery.
Algo que destacar de la aplicación es su persistencia de datos, pues, a pesar de utilizar el local storage del navegador, se ha decidido reforzar esa persistencia al usar una dependencia llamada Json Server para dar una persistencia aún mayor de los datos ingresados por los usuarios. Esta dependencia permite simular una base de datos con un JSON.
Json server nos ayuda a simular un back-end muy básico, ya que nos genera un endpoint en local para simular distintos tipos de request a una API (get, post, delete, patch, etc), permitiendo obtener, agregar y editar informacion de la "base de datos".
Se optó incorporar esta dependencia por la imposibilidad de realizar un post al Json que se usa como base de datos.
## Requisitos
1. HTML5
2. CSS3
3. Bootstrap 5.1.3
4. JavaScript
5. JQuery 3.6.0
6. Json server 0.17.0
    ##### Instalación 
      Se ejecuta el siguiente comando en la terminal:

        npm install -g json-server
  
    ###### Uso
    Para usar Json server, se debe ejecutar el siguiente comando:

        json-server --watch db.json

    (db.json se reemplaza con el nombre de tu archivo .json, en este caso, data.json, y si está en otro directorio, colocar el path completo).

    Luego de ejecutar el comando, se Json server se iniciará en local con la siguiente url por defecto:

        http://localhost:3000/users

    Con esta URL se realizan las peticiones a la api simulada, permitiendo realizar post y patch.

## Agradecimientos
Finalizando el presente documento, agradecer a la profesora Natalia por su paciencia y vocación por la enseñanza, pues, cada clase ha sido de provecho. También agradecer a mi tutor Rodrigo quien me dio feedback, ayuda en mis entregas y palabras de ánimos para seguir en este mundo del desarrollo. Muchas gracias.