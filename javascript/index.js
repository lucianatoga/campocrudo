class producto{
    constructor(nombre, precio){
        this.nombre=nombre;
        this.precio=precio;
    }
}
let productos=[new producto("aros",400), new producto("collar",350),new producto("cinto",1500)];
let productosNombres=productos.map((prod)=>prod.nombre);

function comprar(productoElegido, cantidad){
    productoElegido=productos.find((producto)=>producto.nombre==productoElegido.toLowerCase());
    precioTotal=precioTotal+productoElegido.precio*parseInt(cantidad);
    compras.push({nombre:productoElegido.nombre, cantidad:cantidad, precio:productoElegido.precio});
}
function validarSioNo(entrada, mensaje){
    while(entrada.toLowerCase()!="no"&&entrada.toLowerCase()!="si"){
        alert("Entrada inválida. Por favor ingrese solamente 'si' o 'no'");
        entrada=prompt(mensaje);
    }
    return entrada;
}

let precioTotal=0;
let productoElegido;
let cantidad;
let envio;
let compras =new Array;

let seguir=prompt("Bienvenidx, desea comprar algún producto? Ingrese 'si' o 'no'");
seguir=validarSioNo(seguir,"Bienvenidx, desea comprar algún producto? Ingrese 'si' o 'no'");
while(seguir.toLowerCase()=="si"){
    productoElegido=prompt("Qué producto desea comprar? Ingrese uno de los siguientes: " + productosNombres);
    while(!productosNombres.includes(productoElegido.toLowerCase())){
        alert("Entrada inválida. Por favor ingrese solamente una de las opciones mencionadas.");
        productoElegido=prompt("Qué producto desea comprar? Ingrese uno de los siguientes: " + productosNombres);
    }
    cantidad=prompt("Qué cantidad?");
    while(isNaN(cantidad)){
        alert("Entrada inválida. Por favor ingrese solamente caracteres numéricos");
        cantidad=prompt("Qué cantidad?");
    }
    comprar(productoElegido, cantidad);
    seguir=prompt("Desea agregar otro producto? Ingrese 'si' o 'no'");
    seguir=validarSioNo(seguir, "Desea agregar otro producto? Ingrese 'si' o 'no'");

    if(seguir.toLowerCase()=="no"){
        envio=prompt("Desea pagar envío? Tiene un valor adicional de $150. Ingrese 'si' o 'no'");
        envio=validarSioNo(envio, "Desea pagar envío? Tiene un valor adicional de $150. Ingrese 'si' o 'no'");
        if(envio.toLowerCase()==="si"){
            precioTotal+=150;
        }
    }
}
for(let el of compras){
    console.log(el.nombre + " $" + el.precio + " x"+ el.cantidad)
}
if(envio!=undefined){
    if (envio.toLowerCase()==="si"){
        console.log("Envío: $150");
    }
}
console.log("Precio total final: $"+precioTotal +" - Gracias por su compra!");