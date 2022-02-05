const  videojuegos = [
  {
    nombre: 'Skyrim',
    genero: 'RPG',
    annio: '2011'
  },
  {
    nombre: 'Cyberpunk2077',
    genero: 'shooter rpg',
    annio: '2020'
  },
  {
    nombre: 'The Witcher 3',
    genero: 'RPG',
    annio: 2015
  },
  {
    nombre: 'Bully',
    genero: 'Sand box',
    annio: 2007
  },
  {
    nombre: 'Grand Theft Auto V',
    genero: 'Sand box',
    annio: 2013
  },
  {
    nombre: 'L.A Noire',
    genero: 'Policial',
    annio: 2011
  },
  {
    nombre: 'Los Sims 4',
    genero: 'Simulador',
    annio: 2014
  },
  {
    nombre: 'God Hand',
    genero: 'JRPG',
    annio: '???'
  }
]

const button = document.getElementById("show-games");
button.addEventListener("click", handleShowGames);


function handleShowGames (e) {
  e.preventDefault();
  showGames(videojuegos);
}

function showGames(videogames) {
  let ulVideogames = document.getElementById("videogames");
  for (const videogame in videogames) {
    let div = document.createElement("div");
    div.className = `card`
    div.style.width = "400px";
    div.style.height = "200px";
    div.style.border ="1px solid black"
    let ul = document.createElement("ul");
    let liNombre = document.createElement("li");
    let liGenero = document.createElement("li");
    let liAnnio = document.createElement("li")
    liNombre.innerHTML = videogames[videogame].nombre;
    liGenero.innerHTML = videogames[videogame].genero;
    liAnnio.innerHTML = videogames[videogame].annio;

    ulVideogames.appendChild(div);
    div.appendChild(ul);
    ul.appendChild(liNombre);
    ul.appendChild(liGenero);
    ul.appendChild(liAnnio);
  }
}