const personas = [
  {
    nombre: 'Fanno',
    edad: 25
  },
  {
    nombre: 'Bryan',
    edad: 55
  },
  {
    nombre: 'Seba',
    edad: 10
  },
  {
    nombre: 'Felix',
    edad: 80
  },
  {
    nombre: 'Gadiel',
    edad: 19
  },
  {
    nombre: 'Soul Music',
    edad: 21
  }
]

const ordenado = personas.sort( (edad1, edad2) => {
  if (edad1.edad > edad2.edad) {
    return 1;
  }
  if (edad1.edad < edad2.edad) {
    return -1;
  }

  return 0;
})

console.log(ordenado);