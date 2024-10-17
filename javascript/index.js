class producto{
    constructor(nombre, precio){
        this.nombre=nombre;
        this.precio=precio;
    }
}

let precioTotal=0;
let productoElegido;
let cantidad;
let enviar;
let envio=150;
let compras =new Array;

let productos=[new producto("aros",400), new producto("collar",350),new producto("cinto",1500)];
let productosNombres=productos.map((producto)=>producto.nombre);

function comprar(productoElegido, cantidad){
    productoElegido=productos.find((el)=>el.nombre==productoElegido.toLowerCase());
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

//El ususario es solicitado input, el cual se valida mediante la funcion validarSioNo(). Esta evalua si la entrada es diferente a 'si' o 'no' y de serlo le vuelve a solicitar input al usuario hasta que ingrese un valor aceptado.
//Si el ususario ingresa 'si', se le pregunta que producto de los disponibles desea comprar, se evalua la entrada asegurandose que sea uno de los productos almacenados en el array productos (de no serlo se le vuelve a pedir el input). Seguido a esto se le consulta la cantidad que desea comprar, tambien se evalua la entrada para que solo valores numericos sean ingresados (de no serlo se le vuelve a pedir el input), y se llama a la funcion comprar() pasandole por parametro el producto elegido y la cantidad. Esta funcion buscara el producto elegido dentro del array productos[] y sumara el precio del mismo, multiplicado por la cantidad, a la variable precioTotal. Ademas se agregara al array compras[] el producto elegido como un objeto con sus propiedades nombre, precio y cantidad.
//El ususario es consultado si desea agregar otro producto (se evalua el input), si ingresa 'si' se repite el proceso previamente descripto, pero si ingresa 'no' se le pregunta si desea pagar envio (se evalua el input) y de ingresar 'si' se suma el valor del envio al precioTotal.  
//Finalmente se imprime la lista de productos con su correspondiente precio y cantidad seguido del precio total final. Para esto se itera sobre el array commpras[] y se imprimen los valores de los atributos de cada elemento en el array. Ademas, en el caso de haber elegido el envio, se agrega el correspondiente monto.
//Si el usuario ingresa 'no' en el primer prompt, se saltea todo el proceso anterior y directamente se imprime un mensaje en la consola.

let seguir=prompt("Bienvenidx, desea comprar algún producto? Ingrese 'si' o 'no'");
seguir=validarSioNo(seguir,"Bienvenidx, desea comprar algún producto? Ingrese 'si' o 'no'");
if(seguir==="si"){
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
            enviar=prompt("Desea pagar envío? Tiene un valor adicional de $150. Ingrese 'si' o 'no'");
            enviar=validarSioNo(enviar, "Desea pagar envío? Tiene un valor adicional de $150. Ingrese 'si' o 'no'");
            if(enviar.toLowerCase()==="si"){
                precioTotal+=envio;
            }
        }
    }
    
    for(let el of compras){
        console.log(el.nombre + " $" + el.precio + " x"+ el.cantidad)
    }
    if(enviar!=undefined){
        if (enviar.toLowerCase()==="si"){
            console.log("Envío: $"+envio);
        }
    }
    console.log("Precio total final: $"+precioTotal +" - Gracias por su compra!");
}
else{
    console.log("Gracias por visitarnos!");
}