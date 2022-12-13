window.addEventListener("scroll", function(){
    var header = document.querySelector("header");
    header.classList.toggle("abajo",this.window.scrollY>0);
});


 //-------------------------------------------

// Inicialización de variables

let descubrirTarjetas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let resultado1 = null;
let resultado2 = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let tiempo = 30;
let tiempoRegresivo = null;
let tiempoInicial = 30;


// Apuntando a documento HTML
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");

// Generación de números aleatorios
let num = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
num = num.sort(()=>{return Math.random() -0.5});
console.log(num);


// Funciones
function contarTiempo(){
    tiempoRegresivo = setInterval(()=>{
        tiempo--;
        mostrarTiempo.innerHTML = `Tiempo ${tiempo} segundos`;
        if(tiempo === 0){
            clearInterval(tiempoRegresivo);
            bloquearTarjetas();
        }
    },1000);
}

function bloquearTarjetas(){
    for(let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = num[i];
        tarjetaBloqueada.disabled = true;
    }
}

// Función principal del click
function descubrir(id){
    if(temporizador === false){
        contarTiempo();
        temporizador = true;
    }

    descubrirTarjetas++;
    console.log(descubrirTarjetas);

    if(descubrirTarjetas === 1){
        //muestra el primer numero
        tarjeta1 = document.getElementById(id);
        resultado1 = num[id];
        tarjeta1.innerHTML = resultado1;

       //Deshabilitar primer boton
        tarjeta1.disabled = true;
    }else if(descubrirTarjetas === 2){
        //mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        resultado2 = num[id];
        tarjeta2.innerHTML = resultado2;

        // Deshabilitar segundo boton
        tarjeta2.disabled = true;

        // Incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if(resultado1 === resultado2){
            //Poner en cero el contador tarjetas descubiertas
            descubrirTarjetas = 0;

            // Aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if(aciertos === 8){
                clearInterval(tiempoRegresivo);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😱`;
                mostrarTiempo.innerHTML =  `Fantástico! 🥳🎉 Sólo demoraste ${tiempoInicial - tiempo } segundos `
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} ✌😎 `
            }
        }else{
            //Mostrar momentaneamente valores y volver a tapar
            setTimeout(()=>{
                tarjeta1.innerHTML = " ";
                tarjeta2.innerHTML = " ";
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                descubrirTarjetas = 0;
            },800);
        }
    }
}

//-----------------------------------------------------------------
