//Base de datos en Formato JSON
var cuentas = [
    { id:1,nombre: 'Melvin Sandoval', clave: '1290', saldo: 14000 },
    { id:2,nombre: 'Chris Berganza', clave: '8761', saldo: 12900 },
    { id:3,nombre: 'Kevin Gutierrez', clave: '0081', saldo: 16000 },
    {id:4,nombre: 'Edgar Quiñonez', clave: '6781', saldo: 9000},
    {id:5,nombre: 'Fernando Carranza', clave: '6787', saldo: 7000},
  ];
  //guardar la cadena JSON en el almacenamiento local del navegador.
   var jsonUsiarios = JSON.stringify(cuentas)
   localStorage.setItem('cuentas',jsonUsiarios  );
  
  //Declaración de Variables en JS en base a los ID de HTML
  const usuario = document.getElementById('usuario');
  const password = document.getElementById('password');
  const btnIniciar = document.getElementById('btnIniciar');
  const bienvenido = document.getElementById('bienvenido');
  const logo = document.getElementById('logo');
  const alertaEspacio = document.getElementById('liveAlertPlaceholder');
  
  
  //Variables de Usuario
  var usuarioCuenta = '';
  var usuarioSeleccionado = '';
  
  logo.addEventListener('click', (e) => {
    window.location="/src/Cajero/inicio.html"; 
  });
  
  //Condicional de inicio de sesión de Usuario
  if(usuario)
  {
    usuario.addEventListener('change',(e) => {
      usuarioSeleccionado = usuario.selectedIndex;
        let nombre = usuario.options[usuarioSeleccionado].text; 
        bienvenido.innerHTML = `Bienvenido ${nombre}`;
      });
  }
  //Condicional if pata inicoo de Sesión
  if(btnIniciar){
    btnIniciar.addEventListener('click', (e) => {
      validarContra(); //Revisa las contraseñas con los datos JSON
    });
  }
  if(password){
    password.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        validarContra();//Revisa las contraseñas con los datos JSON
      }
    });
  }
  //Funciones de validación de Contraseñas
  //Lógica de Programación de una Contraseña
  function validarContra(){
    if(password.value == "")
    {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        //Creación de Div para ingreso de contraseña
        `<div class="alert alert-danger alert-dismissible" role="alert">`,
        `   <div>Favor de ingresar una contraseña</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')
      alertaEspacio.append(wrapper);
    }
    else {
      // Obtener todas las cuentas almacenadas en localStorage
      var allUsers = localStorage.getItem('cuentas');
      
      // Convertir el string JSON a un array de objetos
      var arrUsers = JSON.parse(allUsers);
      
      // Iterar sobre cada elemento del array de usuarios
      arrUsers.forEach(element => {
        console.log("elemento: " + element.id);
        
        // Verificar si el ID del elemento coincide con el usuario seleccionado
        if (element.id == usuarioSeleccionado) {
          
          // Verificar si la contraseña ingresada coincide con la contraseña del usuario
          if (password.value == element.clave) {
            
            // Obtener el nombre de usuario de la cuenta encontrada
            usuarioCuenta = element.nombre;
            console.log(usuarioCuenta);
            
            // Almacenar el nombre de usuario, saldo y ID en el localStorage
            localStorage.setItem('nombre', usuarioCuenta);
            localStorage.setItem('saldo', element.saldo);
            localStorage.setItem('id', element.id);
            
            // Redirigir al usuario a la página del cajero automático
            window.location = "/src/Cajero/Estructuras/cajero.html";
          }
    
          else{
            // Crea un nuevo elemento 'div' utilizando el constructor 'document.createElement'
            const wrapper = document.createElement('div')
  
              // Configura el contenido HTML del elemento 'div' utilizando un array de cadenas de texto
            wrapper.innerHTML = [
              `<div class="alert alert-danger alert-dismissible" role="alert">`,
              `   <div>contraseña incorrecta</div>`,
              '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
              '</div>'
            ].join('')
            
            // Agrega el nuevo elemento 'div' al elemento 'alertaEspacio'
            alertaEspacio.append(wrapper);
          }
        }
      });
    } 
  }
  