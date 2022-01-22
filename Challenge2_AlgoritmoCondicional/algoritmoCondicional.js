let respuestaUsuario = prompt("Desea suscribirse a nuestro newsletter? (ingrese S/N para continuar): ");

if (respuestaUsuario.toUpperCase() === "S") {
  const edad = parseInt(prompt("Ingresa tu edad por favor, debes ser mayor de edad para suscribirse:"));

  if (edad > 18) {
    alert("Te has suscrito con éxito.");
  } else {
    alert(`Tan solo tienes ${edad} años. Vuelve cuando seas mayor.`)
  }

} else if (respuestaUsuario.toUpperCase() === "N") {
  alert("Gracias por su tiempo.")
} else {
  alert("Has ingresado data inválida")
}