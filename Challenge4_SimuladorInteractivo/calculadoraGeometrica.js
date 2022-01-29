//FUNCIONES

const perimetroCuadrado = lado => {
  let perimetro = lado * 4;
  return perimetro;
};

const areaCuadrado = lado => {
  let area = Math.pow(lado, 2);
  return area;
};

const perimetroTriangulo = (lado1, lado2, lado3) => {
  let perimetro = lado1 + lado2 + lado3;
  return perimetro;
};

const areaTriangulo = (base, altura) => {
  let area = (base * altura) / 2;
  return area;
};

const perimetroCirculo = radio => {
  let perimetro = 2 * Math.PI * radio;
  return perimetro;
};

const areaCirculo = radio => {
  let area = Math.PI * Math.pow(radio, 2);
  return area;
};

const datosIncorrectos = () => {
  alert('Has introducido datos incorrectos. Intenta de nuevo.');
}


//LOGICA CALCULADORA
const calculadora = opcionUsuario => {

  switch (opcionUsuario) {
    
    case 1: //CALCULAR CARACTERISTICAS DEL CUADRADO
      let datoRequeridoCuadrado = parseInt(prompt('Seleccione lo que desee saber:\n1.Perimetro del Cuadrado\n2.Área del cuadrado'));
      let ladoCuadrado = parseInt(prompt('Ingrese el largo de un lado del cuadrado en cm: '));

      if (datoRequeridoCuadrado === 1) {

        const resultadoPerimetroCuadrado = perimetroCuadrado(ladoCuadrado);
        alert(`El perímetro de tu cuadrado es de ${resultadoPerimetroCuadrado} cm.`);
        break;

      } else if (datoRequeridoCuadrado === 2) {

        const resultadoAreaCuadrado = areaCuadrado(ladoCuadrado);
        alert(`El área de tu cuadrado es de ${resultadoAreaCuadrado} cm cuadrados.`)
        break;

      } else {
        datosIncorrectos();
        break;
      }
    
    case 2: //CALCULAR CARACTERISTICAS DEL TRIANGULO
      let datoRequeridoTriangulo = parseInt(prompt('Seleccione lo que desee saber:\n1.Perimetro del Triángulo\n2.Área del triángulo'));
      let ladosTriangulo = [];
      if (datoRequeridoTriangulo === 1) {

        for (let i = 0; i < 3; i++) {
          ladosTriangulo[i] = parseInt(prompt('Ingrese el largo del lado de su triángulo en cm: '));
        }

        const resultadoPerimetroTriangulo = perimetroTriangulo(ladosTriangulo[0], ladosTriangulo[1], ladosTriangulo[2]);
        alert(`El perímetro de tu triángulo es de ${resultadoPerimetroTriangulo} cm`);
        break;
        
      } else if (datoRequeridoTriangulo === 2) {

        let alturaTriangulo = parseInt(prompt('Ingrese la altura de su triángulo en cm: '));
        let baseTriangulo = parseInt(prompt('Ingrese la base de su triángulo en cm: '));
        const resultadoAreaTriangulo = areaTriangulo(alturaTriangulo, baseTriangulo);
        alert(`El área de tu triángulo es de ${resultadoAreaTriangulo} cm cuadrados.`);
        break;

      } else {
        datosIncorrectos();
        break;
      }
    
    case 3: //CALCULAR CARACTERISTICAS DEL CIRCULO
      let datoRequeridoCirculo = parseInt(prompt('Seleccione lo que desee saber:\n1.Perímetro del círculo\n2.Área del círculo: '));
      let radioCirculo = parseInt(prompt('Ingrese el radio de su círculo en cm: '));

      if (datoRequeridoCirculo === 1) {

        const resultadoPerimetroCirculo = perimetroCirculo(radioCirculo).toFixed(2);
        alert(`El perímetro de tu círculo es de ${resultadoPerimetroCirculo} cm`);
        break;

      } else if (datoRequeridoCirculo === 2) {

        const resultadoAreaCirculo = areaCirculo(radioCirculo).toFixed(2);
        alert(`El área de tu círculo es de ${resultadoAreaCirculo} cm cuadrados.`)
        break;

      }
    
    case 0: //SALIR
      alert('Gracias por preferirnos!')
      dentroBucle = false;
      break;

    default:
      datosIncorrectos();
      break;
  }
}

//EJECUTANDO SIMULADOR

let dentroBucle = true;

alert('¡Bienvenido a la calculadora de figuras geométricas!')

while (dentroBucle) {
  
  let figuraElegidaUsuario = parseInt(prompt('Seleccione el número de la figura que desee calcular:\n1. Cuadrado\n2. Triángulo\n3. Círculo\n0. Salir: '));
  
  calculadora(figuraElegidaUsuario);

}