class producto{
    constructor(id, nombre, precio){
        this.id=id;
        this.nombre=nombre;
        this.precio=precio;
    }
}

let productos=[new producto(1,"aros",400), new producto(2,"collar",350),new producto(3,"cinto",1500)];

let precioTotal=0;
let productoElegido;
let cantidad=0;
let enviar;
let envio=150;

function comprar(id){
    productoElegido=productos.find((el)=>el.id==id);
    const carrito=JSON.parse(localStorage.getItem('carrito'))||[];

    const productoEnCarrito=carrito.find((el)=>el.id==id);
    productoEnCarrito ? productoEnCarrito.cantidad++ : carrito.push({...productoElegido, cantidad:1});
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

const cards_container=document.getElementById("cards-container");
productos.forEach((producto)=>{
    const preview_card=document.createElement("div");
    preview_card.className="preview-card";
    preview_card.innerHTML=`
    <div class="card-title-button">
        <h3>${producto.nombre}</h3>
        <button onclick="comprar('${producto.id}')">&#10010</button>
    </div>
    <img src="./img/${producto.nombre}.jpg" height="100%">
    `;
    cards_container.appendChild(preview_card);
})

function mostrarCarrito(){
    const carrito_section=document.getElementById("carrito-preview-section"); //mostrar nueva seccion en html con datos del carrito
    carrito_section.innerHTML=`
    <hr>
    <h2>Carrito</h2>`;
    const carrito=JSON.parse(localStorage.getItem('carrito'));
    carrito.forEach(({id,nombre, precio, cantidad})=>{
        carrito_section.innerHTML+=`
            <p>- ${nombre} $${precio} x${cantidad}</p>
            
        `;
        precioTotal+=(precio*cantidad);
    });
    const resumen_section=document.createElement("div");
    resumen_section.className="resumenSection";
    resumen_section.innerHTML+=`
    <p><b>Total: $${precioTotal}</b></p>
    <button onclick="limpiarCarrito()">Limpiar</button>
    `;
    carrito_section.appendChild(resumen_section);
}
const carrito_button=document.getElementById("carritoButton");
carrito_button.addEventListener('click', function(){
    mostrarCarrito();
})

function limpiarCarrito(){
    localStorage.clear();
    window.location.href="../index.html";
}

