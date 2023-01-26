//Definición de sets para el autómata, que fungirán como sus transiciones
const TransicionDigitos = new Set(['0', '1','2','3','4','5','6','7','8','9']);
const TransicionSignos = new Set(['+','-']);
const TransicionPunto = new Set(['.']);
const TransicionE = new Set(['e','E']);
var arreglo = [];

const $cadena = document.querySelector("#cadenaValidar");
$cadena.addEventListener('submit', numeros);


function numeros(event){
    //limpiamos el array
    arreglo = [];
    //limpiamos el html
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("recorrido").innerHTML = "";
    //evitamos que se recargue la página
    event.preventDefault(); //para evitar que se recargue la página
    const cadena = new FormData(this);

    var cadena1 = cadena.get('cadenav');

    var bool = AFD1(cadena1);
    if(bool){
        //imprimimos el resultado en el html
        document.getElementById("resultado").innerHTML = "<h4 class='text-center impresion'>La cadena"+ "  "+cadena1+"  "+" es correcta</h4>";
        //recorremos e imprimimos el recorrido
        for (var i = 0; i < arreglo.length; i++) {
            document.getElementById("recorrido").innerHTML += "<h4 class='text-center impresion'>"+arreglo[i]+"</h4>";
        }


    }else{
        //imprimimos el resultado en el html
        document.getElementById("resultado").innerHTML = "<h4 class='text-center impresion'>La cadena"+ "  "+cadena1+"  "+" es incorrecta</h4>";
        //recorremos e imprimimos el recorrido
        for (var i = 0; i < arreglo.length; i++) {
            document.getElementById("recorrido").innerHTML += "<h4 class='text-center impresion'>"+arreglo[i]+"</h4>";
        }

    }
   




}


//INICIO DEL AUTÓMATA
function AFD1(cadena){
    //Insertamos el estado en el array
    arreglo.push("Q0");
    bool = ESTADOQ0(cadena);

    console.log(arreglo);

    return bool;
}

//ESTADO Q0
function ESTADOQ0(cadena){
    bool = false;
    //cadena auxiliar
    var aux = cadena[0];

    if (TransicionSignos.has(aux)) {
        //Insertamos el estado en el array
        arreglo.push("Q1");
        //Quitamos el primer caracter de la cadena
        cadena = cadena.substring(1);
        //verificamos si la cadena es vacia
        if (cadena.length == 0) {
            arreglo.push("ESTADOMUERTO")
            return bool;
        } else {
            return ESTADOQ1(cadena);
        }
    } else if (TransicionDigitos.has(aux)) {
        //Insertamos el estado en el array
        arreglo.push("Q2");
        //Quitamos el primer caracter de la cadena
        cadena = cadena.substring(1);
        //verificamos si la cadena es vacia
        if (cadena.length == 0) {
            return !bool;
        } else {
            return ESTADOQ2(cadena);
        }
    } else {
        return bool;
    }
}

//ESTADO Q1
function ESTADOQ1(cadena){
   bool = false;
   var aux = cadena[0];

   if (TransicionDigitos.has(aux)) {
       //Insertamos el estado en el array
       arreglo.push("Q2");
       //Quitamos el primer caracter de la cadena
       cadena = cadena.substring(1);
       //verificamos si la cadena es vacia
       if (cadena.length == 0) {
           return !bool;
       } else {
           return ESTADOQ2(cadena);
       }
   }else{
         arreglo.push("ESTADOMUERTO")
         return bool;
   }

}
//ESTADO Q2
function ESTADOQ2(cadena){
    bool = true;
    var aux = cadena[0];
    
    if(TransicionDigitos.has(aux)){
        arreglo.push("Q2");
        cadena = cadena.substring(1);
        if(cadena.length == 0){
            return bool;
        }else{
            return ESTADOQ2(cadena);
        }
    }else if(TransicionPunto.has(aux)){
        arreglo.push("Q3");
        cadena = cadena.substring(1);
        
        if(cadena.length == 0){
            arreglo.push("ESTADOMUERTO")
            return !bool;
        }else{
            return ESTADOQ3(cadena);
        }
        
    }else if(TransicionE.has(aux)){
        arreglo.push("Q4");
        cadena = cadena.substring(1);
        
        if(cadena.length == 0){
            arreglo.push("ESTADOMUERTO")
            return !bool;
        }else{
            return ESTADOQ4(cadena);
        }
    }else{
        arreglo.push("ESTADOMUERTO")
        return !bool;

    }

}

//ESTADO Q3
function ESTADOQ3(cadena){
    bool = false;
    var aux = cadena[0];
    
    if(TransicionDigitos.has(aux)){
        arreglo.push("Q5");
        cadena = cadena.substring(1);
        if(cadena.length == 0){
            return !bool;
        }else{
            return ESTADOQ5(cadena);
        }
    }else{
        arreglo.push("ESTADOMUERTO")
        return bool;
    }
}

//ESTADO Q4
function ESTADOQ4(cadena){
    bool = false;
    var aux = cadena[0];
    
    if(TransicionDigitos.has(aux)){
        arreglo.push("Q7");
        cadena = cadena.substring(1);
        if(cadena.length == 0){
            return !bool;
        }else{
            return ESTADOQ7(cadena);
        }
    }else if(TransicionSignos.has(aux)){
        arreglo.push("Q6");
        cadena = cadena.substring(1);
        if(cadena.length == 0){
            arreglo.push("ESTADOMUERTO")
            return bool;
        }else{
            return ESTADOQ6(cadena);
        }
    }else{
        arreglo.push("ESTADOMUERTO")
        return bool;
    }
}

//ESTADO Q5
function ESTADOQ5(cadena){
    bool = true;
    var aux = cadena[0];

    if(TransicionDigitos.has(aux)){
        arreglo.push("Q5");
        cadena = cadena.substring(1);
        if(cadena.length == 0){
            return bool;
        }else{
            return ESTADOQ5(cadena);
        }
    }else if(TransicionE.has(aux)){
        arreglo.push("Q4");
        cadena = cadena.substring(1);
        if(cadena.length == 0){
            return !bool;
        }else{
            return ESTADOQ4(cadena);
        }
    }else{
        return !bool;
    }
}

//ESTADO Q6
function ESTADOQ6(cadena){
    bool = false;
    var aux = cadena[0];

    if(TransicionDigitos.has(aux)){
        arreglo.push("Q7");
        cadena = cadena.substring(1);
        if(cadena.length == 0){
            return !bool;
        }else{
            return ESTADOQ7(cadena);
        }
    }else{
        arreglo.push("ESTADOMUERTO")
        return bool;
    }
}

//ESTADO Q7
function ESTADOQ7(cadena){
    bool = true;
    var aux = cadena[0];

    if(TransicionDigitos.has(aux)){
        arreglo.push("Q7");
        cadena = cadena.substring(1);
        if(cadena.length == 0){
            return bool;
        }else{
            return ESTADOQ7(cadena);
        }
    }else{
        arreglo.push("ESTADOMUERTO")
        return !bool;
    }
}