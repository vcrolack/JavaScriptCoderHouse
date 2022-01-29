const ingresarNumero = () => {
  const numero = parseInt(prompt('Ingrese un número para determinar si es par o no: '));
  return numero;
};

const esPar = numero => {
  
  let esPar;

  if (numero % 2 === 0) {
    esPar = true;
  } else {
    esPar = false;
  }

  return esPar;
}

const mostrarComparacion = (parOImpar) => {
  if (parOImpar) {
    alert(`El número es par!`);
  } else {
    alert('El numero es impar!')
  }
};

//EJECUCION
const numero = ingresarNumero();
const comprobacion = esPar(numero);
mostrarComparacion(comprobacion);