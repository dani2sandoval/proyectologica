// Codificación de Inicio de Simulador de Cajero Automatico -_-
/**
 * Obtiene las referencias a los elementos del DOM mediante su ID.
 * @constant {HTMLElement}
 */
/// Declaración de variables de tipo const
const bienvenido = document.getElementById('bienvenido');
const logo = document.getElementById('logo');
const movimientoSaldo = document.getElementById('movimientoSaldo');
const consultarSaldo = document.getElementById('consultarSaldo');
const ingresarSaldo = document.getElementById('ingresarSaldo');
const retirarSaldo = document.getElementById('retirarSaldo');
const btnConfirmar = document.getElementById('btnConfirmar');
const alertaInfo = document.getElementById('alertaInfo');
const numcantidad = document.getElementById('numcantidad');


// Variable para almacenar los retiros
let retiros = [];


/**
 * Almacena el tipo de operación actual.
 * @type {string}
 */
var tipoOperacion = '';

/**
 * Evento de clic para el elemento del logo.
 * Elimina los datos almacenados en el localStorage y redirige al usuario a la página de inicio.
 * @param {Event} e - Evento de clic
 */
logo.addEventListener('click', (e) => {
  localStorage.removeItem('saldo');
  localStorage.removeItem('id');
  localStorage.removeItem('nombre');
  localStorage.removeItem('cuentas');
  window.location = "/src/Cajero/inicio.html";
});
/**
 * Expliación de lo anterior
 * Elimina la información almacenada en el localStorage para las claves 'saldo', 'id', 'nombre' y 'cuentas'.
 * Redirige al usuario a la página de inicio ubicada en "/src/Cajero/inicio.html"
 */


if (consultarSaldo) {
  consultarSaldo.addEventListener('click', (e) => {
    // Actualiza el contenido del elemento 'bienvenido' con el nombre almacenado en el objeto 'localStorage'
    bienvenido.innerHTML = `Bienvenido ${localStorage.getItem('nombre')}`;

    // Configura la opacidad del elemento 'movimientoSaldo' a 0
    movimientoSaldo.style.opacity = 0;

    // Obtiene el saldo almacenado en el objeto 'localStorage'
    let saldo = localStorage.getItem('saldo');

    // Crea un nuevo elemento 'div' utilizando el constructor 'document.createElement'
    const wrapper = document.createElement('div');

    // Asigna contenido HTML al nuevo elemento 'div' utilizando la propiedad 'innerHTML'
    wrapper.innerHTML = `
      <div class="alert alert-info alert-dismissible" role="alert">
        <div>Tu saldo es de ${saldo} Quetzales.</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;

    // Agrega el nuevo elemento 'div' al elemento 'alertaInfo'
    alertaInfo.append(wrapper);
  });
}

if (ingresarSaldo) {
  // Agrega un evento de clic al elemento 'ingresarSaldo'
  ingresarSaldo.addEventListener('click', (e) => {
    // Actualiza el contenido del elemento 'bienvenido' con el nombre almacenado en el objeto 'localStorage'
    bienvenido.innerHTML = `Bienvenido ${localStorage.getItem('nombre')}`;

    // Configura la opacidad del elemento 'movimientoSaldo' a 1 para hacerlo visible
    movimientoSaldo.style.opacity = 1;

    // Asigna el valor 'I' a la variable 'tipoOperacion'
    // Esta variable almacena el tipo de operación actual y se utiliza más adelante
    tipoOperacion = 'I';
  });
}

if (retirarSaldo) {
  retirarSaldo.addEventListener('click', (e) => {
    bienvenido.innerHTML = `Bienvenido ${localStorage.getItem('nombre')}`;
    movimientoSaldo.style.opacity = 1;
    tipoOperacion = 'R';
  });
}

if (btnConfirmar) {
  // Verifica si el elemento 'btnConfirmar' existe y no es null ni undefined
  btnConfirmar.addEventListener('click', (e) => {
    // Previene el comportamiento por defecto del evento, en este caso, evitar el envío de un formulario
    e.preventDefault();

    // Verifica si el campo de cantidad (numcantidad) está vacío
    if (numcantidad.value == "") {
      // Crea un nuevo elemento 'div' utilizando el constructor 'document.createElement'
      const wrappererror = document.createElement('div');

      // Asigna contenido HTML al nuevo elemento 'div' utilizando la propiedad 'innerHTML'
      wrappererror.innerHTML = `
        <div class="alert alert-danger alert-dismissible" role="alert">
          <div>Favor de ingresar una cantidad</div>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;

      // Agrega el nuevo elemento 'div' al elemento 'alertaInfo'
      alertaInfo.append(wrappererror);
    }
    // Verifica si el valor en el campo de cantidad (numcantidad) es menor a 1
    else if (numcantidad.value < 1) {
      // Crea un nuevo elemento 'div' utilizando el constructor 'document.createElement'
      const wrappererror = document.createElement('div');

      // Asigna contenido HTML al nuevo elemento 'div' utilizando la propiedad 'innerHTML'
      wrappererror.innerHTML = `
        <div class="alert alert-danger alert-dismissible" role="alert">
          <div>Debe ingresar una cantidad mayor a 0</div>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;

      // Agrega el nuevo elemento 'div' al elemento 'alertaInfo'
      alertaInfo.append(wrappererror);
    } else {
      // Si la cantidad ingresada es válida, llama a la función 'validarSaldo' con el tipo de operación actual (almacenado en la variable 'tipoOperacion')
      validarSaldo(tipoOperacion);
    }
  });
}


function validarSaldo() {
  // Declaración e inicialización de variables
  let nuevoSaldo = 0;
  let saldo = localStorage.getItem('saldo');

  // Imprime en la consola el valor de 'numcantidad'
  console.log(numcantidad.value);

  // Verifica si la operación es de ingreso ('I')
  if (tipoOperacion == 'I') {
    // Calcula el nuevo saldo sumando el saldo actual y el valor ingresado
    nuevoSaldo = parseInt(saldo) + parseInt(numcantidad.value);

    // Verifica si el nuevo saldo supera el límite de 9999
    if (nuevoSaldo > 9999) {
      // Crea un nuevo elemento 'div' utilizando el constructor 'document.createElement'
      const wrappererror = document.createElement('div');

      // Asigna contenido HTML al nuevo elemento 'div' utilizando la propiedad 'innerHTML'
      wrappererror.innerHTML = `
        <div class="alert alert-danger alert-dismissible" role="alert">
          <div>No se pueden ingresar Q.${numcantidad.value} porque da un total de Q.${nuevoSaldo}<br>
          El saldo en la cuenta no debe ser mayor a Q.10,000.00</div>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;

      // Agrega el nuevo elemento 'div' al elemento 'alertaInfo'
      alertaInfo.append(wrappererror);
    } else {
      // Actualiza el saldo en el almacenamiento local
      localStorage.setItem('saldo', nuevoSaldo);

      // Crea un nuevo elemento 'div' utilizando el constructor 'document.createElement'
      const wrapper = document.createElement('div');

      // Asigna contenido HTML al nuevo elemento 'div' utilizando la propiedad 'innerHTML'
      wrapper.innerHTML = `
        <div class="alert alert-success alert-dismissible" role="alert">
          Se ingresaron correctamente Q.${numcantidad.value}, su nuevo saldo es de Q.${nuevoSaldo}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;

      // Agrega el nuevo elemento 'div' al elemento 'alertaInfo'
      alertaInfo.append(wrapper);
    }
  }
  // Si la operación no es de ingreso, asume que es de retiro
  else {
    // Calcula el nuevo saldo restando el valor ingresado al saldo actual
    nuevoSaldo = parseInt(saldo) - parseInt(numcantidad.value);

    // Verifica si el nuevo saldo cae por debajo del límite de 100
    if (nuevoSaldo < 100) {
      // Crea un nuevo elemento 'div' utilizando el constructor 'document.createElement'
      const wrappererror = document.createElement('div');

      // Asigna contenido HTML al nuevo elemento 'div' utilizando la propiedad 'innerHTML'
      wrappererror.innerHTML = `
        <div class="alert alert-danger alert-dismissible" role="alert">
          <div>No se pueden retirar Q.${numcantidad.value} porque da un total de Q.${nuevoSaldo}<br>
          El saldo en la cuenta no debe ser menor a Q.100.00</div>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;

      // Agrega el nuevo elemento 'div' al elemento 'alertaInfo'
      alertaInfo.append(wrappererror);
    } else {
      // Actualiza el saldo en el almacenamiento local
      localStorage.setItem('saldo', nuevoSaldo);

      // Crea un nuevo elemento 'div' utilizando el constructor 'document.createElement'
      const wrapper = document.createElement('div');

      // Asigna contenido HTML al nuevo elemento 'div' utilizando la propiedad 'innerHTML'
      wrapper.innerHTML = `
        <div class="alert alert-success alert-dismissible" role="alert">
          Se retiraron correctamente Q.${numcantidad.value}, su nuevo saldo es de Q.${nuevoSaldo}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
        
      var Retiro = numcantidad.value;
      // Imprime en la consola el mensaje con la cantidad retirada
      console.log("SE LOGRO EL RETIRO DE: "+Retiro);
    
      // Agrega el nuevo elemento 'div' al elemento 'alertaInfo'
      alertaInfo.append(wrapper);
    }
  }

  // Limpia el valor de 'numcantidad'
  numcantidad.value = '';
}

const btnCerrarSesion = document.getElementById('btnCerrarSesion');

btnCerrarSesion.addEventListener('click', function() {
  // Realizar acciones de cierre de sesión aquí
  localStorage.removeItem('saldo');
  localStorage.removeItem('id');
  localStorage.removeItem('nombre');
  localStorage.removeItem('cuentas');
  window.location = "/src/Cajero/inicio.html";
});

function imprimirTicket() {
  // Obtener el contenido del ticket
  var ticketContent = obtenerContenidoTicket();

  // Mostrar el contenido del ticket en el contenedor
  var ticketContainer = document.getElementById('ticketContainer');
  ticketContainer.innerHTML = ticketContent;

  // Imprimir el ticket
  window.print();
}

function imprimirTicket() {
  // Obtener el contenido del ticket
  var ticketContent = obtenerContenidoTicket();

  // Mostrar el contenido del ticket en el contenedor
  var ticketContainer = document.getElementById('ticketContainer');
  ticketContainer.innerHTML = ticketContent;

  // Mostrar el contenedor del ticket antes de imprimir
  ticketContainer.style.display = 'block';

  // Imprimir el ticket
  window.print();

  // Ocultar el contenedor del ticket después de imprimir
  ticketContainer.style.display = 'none';
}
function obtenerContenidoTicket() {
  // Obtener la fecha y hora actual
  var fecha = new Date();
  var fechaFormateada = fecha.toLocaleDateString();
  var horaFormateada = fecha.toLocaleTimeString();
  //DATOS DE LA CUENTA
  var nombreUsuario = localStorage.getItem('nombre');
  var saldoUsuario = localStorage.getItem('saldo');

  // Aquí puedes generar dinámicamente el contenido del ticket
 // impresion de nuestro ticket de retiros 
  var contenido = `
    <h1 id="Datos">Ticket de Retiro</h1>
    <hr style= "3px solid black">
    <h2 id= "Datos_1"> BANCO INTERNACIONAL</h2>
    <p> Usuario: ${nombreUsuario}</p>
    <p>Fecha: ${fechaFormateada}</p>
    <p>Hora: ${horaFormateada}</p>
    <p>Saldo Resultante: ${saldoUsuario}</p>
    <br>
    <h2 id="Datos"> GRACIAS POR LA PREFERENCIA!!!</h2>
    <h3 id="Datos">VUELVE PRONTO :)</h3>
    <!-- Otros detalles del ticket -->
  `;
   // Agregar los retiros al contenido del ticket
   contenido += '<h3>Retiros:</h3>';
   retiros.forEach((retiro, index) => {
     contenido += `
       <p>Retiro ${index + 1}: Cantidad: Q.${retiro.cantidad} - Saldo Resultante: Q.${retiro.saldo}</p>`;
   });

  return contenido;
}