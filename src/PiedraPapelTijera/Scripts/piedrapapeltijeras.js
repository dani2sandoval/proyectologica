const seccionBatalla = document.getElementById('campo-batalla');
const msjBatalla = document.getElementById('msj-batalla');
const imgAtaqueJugador = document.getElementById('img-ataque-jugador');
const imgAtaquePc = document.getElementById('img-ataque-pc');
const btnPiedra = document.getElementById('btn-piedra');
const btnPapel = document.getElementById('btn-papel');
const btnTijeras = document.getElementById('btn-tijeras');

let opcionJugador;
let opcionPc;
let imgJugador;
let imgPc;


const imagenes = [
    {
        name: "Piedra",
        url: "/src/PiedraPapelTijera/Imagenes/Piedra.png" 
    },
    {
        name: "Papel",
        url: "src/PiedraPapelTijera/Imagenes/Papel.png"
    },
    {
        name: "Tijeras",
        url: "src/PiedraPapelTijera/Imagenes/Tijeras.png" 
    }
];



function iniciar(){
    seccionBatalla.style.display = 'none';
};

btnPiedra.addEventListener('click', function(){
    opcionJugador = "Piedra";
    opPc();
});

btnPapel.addEventListener('click', function(){
    opcionJugador = "Papel";
    opPc();
});

btnTijeras.addEventListener('click', function(){
    opcionJugador = "Tijeras";
    opPc();
})


function opPc(){
    var aleaorio = nAleatorio();

    if(aleaorio == 0){
        opcionPc = "Piedra";
    }else if(aleaorio == 1){
        opcionPc = "Papel";
    }else if(aleaorio == 2){
        opcionPc = "Tijeras"
    };

    batalla();

};

function batalla(){
    if(opcionJugador == opcionPc){
        msjBatalla.innerHTML = "Empate";
    }else if(opcionJugador == "Piedra" && opcionPc == "Tijeras"){
        msjBatalla.innerHTML = "Ganaste!";
    }else if(opcionJugador == "Papel" && opcionPc == "Piedra"){
        msjBatalla.innerHTML = "Ganaste!";
    }else if(opcionJugador == "Tijeras" && opcionPc == "Papel"){
        msjBatalla.innerHTML = "Ganaste!";
    }else{
        msjBatalla.innerHTML = "Perdiste :(";
    };

    addImagenes();

}

//Función aletoria en la selección de imagenes.
function nAleatorio(){
    let n = Math.floor(Math.random() * 3);
    return n;
}

function addImagenes(){
    for(let i=0;i<imagenes.length;i++){
    // Verifica si la opción del jugador coincide con el atributo "name" de la imagen actual
        if(opcionJugador == imagenes[i].name){
         // Asigna la URL de la imagen del jugador a la variable imgJugador
            imgJugador = imagenes[i].url;
        // Crea una cadena de texto que representa una etiqueta <img> con la clase "img-batalla" y la URL de la imagen del jugador
            var inserta = `<img class="img-batalla" src=${imgJugador} alt="">`;
            imgAtaqueJugador.innerHTML = inserta;
        };
        
        if(opcionPc == imagenes[i].name){
            imgPc = imagenes[i].url;
            var inserta = `<img class="img-batalla" src=${imgPc} alt="">`;
            imgAtaquePc.innerHTML = inserta;
        };
        
    }; 

seccionBatalla.style.display = 'flex';
};
    



window.addEventListener('load', iniciar);