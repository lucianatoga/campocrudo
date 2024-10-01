
function comprar(producto, cantidad){
    switch(producto.toLowerCase()){
        case "aros":
            precioTotal=precioTotal+400*parseInt(cantidad);
            break;
        case "collar":
            precioTotal=precioTotal+350*parseInt(cantidad);
            break;
        case "cinto":
            precioTotal=precioTotal+1500*parseInt(cantidad);
            break; 
    }
}
let precioTotal=0;
let producto;
let cantidad;

let seguir=prompt("Bienvenidx, desea comprar algún producto? Ingrese 'si' o 'no'");
while(seguir.toLowerCase()!="no"&&seguir.toLowerCase()!="si"){
    alert("Entrada inválida. Por favor ingrese solamente 'si' o 'no'");
    seguir=prompt("Bienvenidx, desea comprar algún producto? Ingrese 'si' o 'no'");
}
while(seguir.toLowerCase()!="no"){
    producto=prompt("Qué producto desea comprar? Ingrese uno de los siguientes: 'aros', 'collar', 'cinto'");
    while(producto.toLowerCase()!="aros"&&producto.toLowerCase()!="collar"&&producto.toLowerCase()!="cinto"){
        alert("Entrada inválida. Por favor ingrese solamente una de las opciones mencionadas.");
        producto=prompt("Qué producto desea comprar? Ingrese uno de los siguientes: 'aros', 'collar', 'cinto'");
    }
    cantidad=prompt("Qué cantidad?");
    while(isNaN(cantidad)){
        alert("Entrada inválida. Por favor ingrese solamente caracteres numéricos");
        cantidad=prompt("Qué cantidad?");
    }
    comprar(producto, cantidad);
    
    seguir=prompt("Desea agregar otro producto? Ingrese 'si' o 'no'");
    while(seguir.toLowerCase()!="no"&&seguir.toLowerCase()!="si"){
        alert("Entrada inválida. Por favor ingrese solamente 'si' o 'no'");
        seguir=prompt("Desea agregar otro producto? Ingrese 'si' o 'no'");
    }
    if(seguir.toLowerCase()=="no"){
        let envio=prompt("Desea pagar envío? Tiene un valor adicional de $150. Ingrese 'si' o 'no'");
        while(envio.toLowerCase()!="no"&&envio.toLowerCase()!="si"){
            alert("Entrada inválida. Por favor ingrese solamente 'si' o 'no'");
            envio=prompt("Desea pagar envío? Tiene un valor adicional de $150. Ingrese 'si' o 'no'");
        }
        if(envio.toLowerCase()==="si"){
            precioTotal+=150;
        }
    }
}

console.log("El precio total final es: $"+precioTotal +" - Gracias por su compra!");
