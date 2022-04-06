const tablero = document.getElementById("tablero");
tablero.style.gridTemplateColumns="repeat(31,1fr)";
tablero.style.gridTemplateRows="repeat(15,1fr)";
const parar = document.getElementById("parar");
const iniciarJuego = document.getElementById("iniciar");
let puntaje = document.getElementById("puntaje");
const reiniciarJuego = document.getElementById("reiniciar");
const perdisteMensaje = document.getElementById("perdiste");
document.addEventListener("keydown",(e)=>direccion(e.key))
parar.onclick=()=>clearInterval(intervalo);
iniciarJuego.onclick=()=>intervalo = setInterval(aumentar,100);
reiniciarJuego.onclick=()=>location.reload();
// -----------------Intervalo
// let intervalo = setInterval(aumentar,100);
let intervalo ="";

////////////////-----------

let azar = (n) => Math.round(Math.random()*n);
let lista = []

class Tabla{
    constructor(x,y,elemento,colorTabla){
        this.ubicacion={
            x,
            y,
        };
        this.elemento=elemento;
        this.colorTabla=colorTabla;
    }
}

class HacerUnidad{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}

// hacer la tabla
let coloresTabla=false;
for(let i=0;i<15;i++){
    for(let j=0;j<31;j++){
        const elemento = document.createElement("div");
        //j => x // i => y
        let obj = new Tabla(j,i,elemento,coloresTabla);
        coloresTabla=!coloresTabla;
        tablero.append(elemento)
        lista.push(obj)
    }
}

function hacerComida(viborita){
    let obj = new HacerUnidad(azar(29),azar(14))
    for(let i=0;i<viborita.length;i++){
        if( viborita[i].x === obj.x && viborita[i].y === obj.y ){
            obj = new HacerUnidad(azar(29),azar(14));
            i=-1;
        }
    }
    return obj
}

let vib1 = new HacerUnidad(3,0);
let vib2 = new HacerUnidad(2,0);
let vib3 = new HacerUnidad(1,0);
let vib4 = new HacerUnidad(0,0);

let dato="ArrowRight";
let movimientos=["ArrowRight","ArrowRight","ArrowRight","primerMovimiento"];
let vibora = [vib1,vib2,vib3,vib4];
let comida=hacerComida(vibora)

function retroseso(dato){
    switch(dato){
        case 'ArrowUp':
            movimientos[0]!='ArrowDown' ? movimientos.unshift(dato):movimientos.unshift('ArrowDown');
            break;
        case 'ArrowDown':
            movimientos[0]!='ArrowUp' ? movimientos.unshift(dato):movimientos.unshift('ArrowUp');
            break;
        case 'ArrowLeft':
            movimientos[0]!='ArrowRight' ? movimientos.unshift(dato):movimientos.unshift('ArrowRight');
            break;
        case 'ArrowRight':
            movimientos[0]!='ArrowLeft' ? movimientos.unshift(dato):movimientos.unshift('ArrowLeft');
            break;
    }
}


// Perder
function iteracion(viboraLista){
    for(let i=1;i<viboraLista.length;i++){
        if(viboraLista[0].x==viboraLista[i].x&&viboraLista[0].y==viboraLista[i].y){
            return true
        }
    }
    return false
}
function perder(vibora){
    if( ( vibora[0].x<0 || vibora[0].x>30 ) || ( vibora[0].y<0 || vibora[0].y>14 ) || iteracion(vibora) ){
      return true
    }
    return false
}
/////////////
function sumas(dato,objeto){
    switch(dato){
        case 'ArrowUp':
            objeto.y=objeto.y-1;
            break;
        case 'ArrowDown':
            objeto.y=objeto.y+1
            break;
        case 'ArrowLeft':
            objeto.x=objeto.x-1
            break;
        case 'ArrowRight':
            objeto.x=objeto.x+1
            break;
    }
}



function aumentar(){
    console.log("funcionando")
    retroseso(dato);
    let interruptor=false;
    let ultimoObjeto="";
    if(comida.x==vibora[0].x&&comida.y==vibora[0].y){
        interruptor=true;
        ultimoObjeto={x:parseInt(vibora[vibora.length-1].x), y:parseInt(vibora[vibora.length-1].y)}
    }else{
        movimientos.pop()
    }
    for(let i=0;i<vibora.length;i++){
        sumas(movimientos[i],vibora[i])
    }
    if(interruptor){
        const obj = new HacerUnidad(ultimoObjeto.x,ultimoObjeto.y);
        vibora.push(obj);
        comida=hacerComida(vibora);
        interruptor=false;
        console.log(obj)
        ultimoObjeto="";
        console.log(vibora)
    }
    puntaje.innerHTML=`🍎${vibora.length-4} APPLES`;
    if(perder(vibora)){
        clearInterval(intervalo);
        perdisteMensaje.style.display="block";
        console.log("Perdiste")
    }else{
        pintar();
    }
}

const direccion = valor => {
    switch (valor) {
        case 'ArrowUp':
            dato='ArrowUp';
            break;
        case 'ArrowDown':
            dato='ArrowDown';
            break;
        case 'ArrowLeft':
            dato='ArrowLeft';
            break;
        case 'ArrowRight':
            dato='ArrowRight';
            break;
    }
}



function pintar(){
    for(let i=0;i<lista.length;i++){
        lista[i].elemento.classList.toggle("cabezaVibora",false);
        lista[i].elemento.classList.toggle("vibora",false)
        lista[i].elemento.classList.toggle("comida",false)
        lista[i].elemento.classList.toggle("color1",true)
        if(lista[i].colorTabla){
            lista[i].elemento.classList.toggle("color2",true);
        }else{
            lista[i].elemento.classList.toggle("color1",true);
        }
        if(comida.x==lista[i].ubicacion.x && comida.y==lista[i].ubicacion.y){
            // lista[i].elemento.classList.toggle("color1",false)
            // lista[i].elemento.classList.toggle("color2",false)
            lista[i].elemento.classList.toggle("comida",true)
        }
        for(let j=0;j<vibora.length;j++){
            if(vibora[j].x==lista[i].ubicacion.x && vibora[j].y==lista[i].ubicacion.y){
                lista[i].elemento.classList.toggle("color1",false)
                lista[i].elemento.classList.toggle("color2",false)
                lista[i].elemento.classList.toggle("comida",false)
                lista[i].elemento.classList.add("vibora")
            }
            if(vibora[0].x==lista[i].ubicacion.x && vibora[0].y==lista[i].ubicacion.y){
                lista[i].elemento.classList.toggle("cabezaVibora",true);
            }
        }
    }
}

pintar()

// const el1 = document.createElement("div");
// const el2 = document.createElement("div");
// el2.innerHTML="sasd"
// el1.append(el2);
// console.log(el1.children[0].innerHTML)
// console.log(el2.innerHTML)