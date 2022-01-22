//variables para simular la tienda
let isRun = true;
let carrito = [];
let procesadores = "1. Intel i7\n2. Intel i5\n3. Ryzen 3\n4. Ryzen 7\n0. Salir";
let graficas = "1. Asus RTX 3090\n2. AMD RX2070\n0. Salir"

alert("¡Bienvenido a Insumos TECH!");

//un bucle while que siempre esté ejecutándose a menos que el usuario salga de la tienda
while (isRun === true) {
  //selecciona qué quiere ver
  let opcionUsuario = parseInt(prompt("Tenemos las siguientes categorías: \n1. Procesadores\n2.Gráficas\n3.Carrito\n0. Salir"));

  switch (opcionUsuario) {
    case 1:  //1 Procesadores
      let opcionProce = parseInt(prompt(`LISTA PROCESADORES:\n${procesadores}`))
        switch(opcionProce) {
          case 1:
            carrito.push("Intel i7");
            break;
          case 2:
            carrito.push("Intel i5");
            break;
          case 3:
            carrito.push("Ryzen 3");
            break;
          case 4:
            carrito.push("Ryzen 7");
          case 0:
            break;
          default:
            alert("data invalida");
        }
      break;
    
    case 2: //2 Graficas
      let opcionGrafica = parseInt(prompt(`LISTA GRAFICAS:\n${graficas}`));
      switch(opcionGrafica) {
        case 1:
          carrito.push("Asus RTX 3090");
          break;
        case 2:
          carrito.push("AMD RX2070");
          break;
        case 0:
          break;
        default:
          alert("data invalida");
      }
      break;
    case 3: //4 Carrito
      if (carrito.length > 0) {
        alert(
          "TU CARRITO:\n" + carrito.join('\n')
        )
      } else {
        alert("Tu carro está vacío.")
      }
      break;
    
    case 0: // Salir
      isRun = false;
      break;
    
    default:
      alert("Ingresaste una opción inválida.")
      break;
  }
}