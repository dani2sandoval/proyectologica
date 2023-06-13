
//Codigo de Funciones de Aparicion de Notificaciones dentro del Login

const boton = document.getElementById('btn_Iniciar');
const cerrar = document.getElementById('botoncierre');  

boton.onclick = function mostrar() {
return document.querySelector(".notificacion").style.transform = "translate(0px)";
}

cerrar.onclick = function ocultar(){
	return document.querySelector(".notificacion").style.transform = "translate(-110%)";
}
