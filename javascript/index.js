class producto{
    constructor(id, nombre, precio){
        this.id=id;
        this.nombre=nombre;
        this.precio=precio;
    }
}

let productos=[new producto(1,"aros",400), new producto(2,"collar",350),new producto(3,"cinto",1500)];
let carritoVisible=false;

function comprar(id){
    const producto_elegido=productos.find((el)=>el.id==id);
    const carrito=JSON.parse(localStorage.getItem('carrito'))||[];

    const producto_en_carrito=carrito.find((el)=>el.id==id);
    producto_en_carrito ? producto_en_carrito.cantidad++ : carrito.push({...producto_elegido, cantidad:1});
    localStorage.setItem('carrito', JSON.stringify(carrito));
    if(carritoVisible){
        mostrarCarrito()
    };
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
    let precioTotal=0;
    const carrito_section=document.getElementById("carrito-preview-section");
    carrito_section.innerHTML=`
    <hr>
    <h2>Carrito</h2>`;
    const carrito=JSON.parse(localStorage.getItem('carrito'))||[];
    carrito.forEach(({nombre, precio, cantidad})=>{
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
    carritoVisible=true;
}
const carrito_button=document.getElementById("carritoButton");
carrito_button.addEventListener('click', function(){
    mostrarCarrito();
})

function limpiarCarrito(){
    localStorage.clear();
    location.reload();
}

