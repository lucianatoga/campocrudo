const productos_stock=[];
async function traerProductos(){
        const response= await fetch("../data/productos.json");
        const json= await response.json();
        if(document.getElementById("categories-container")){
            displayCategories(json.productos);
        }
        if(document.getElementById("cards-container")){
            displayProductos(json.productos);
        }
        (json.productos).forEach(producto=>productos_stock.push(producto))
    }
document.addEventListener('DOMContentLoaded', function(){
    traerProductos();
});


function displayCategories(productos){
    const categories_container=document.getElementById("categories-container");
    const category_list=[... new Set(productos.map(producto=>producto.categoria))];
    category_list.forEach((category)=>{
        const producto_category=productos.find(producto=>producto.categoria===category);
        const category_card=document.createElement("div");
        category_card.className="preview-card";
        category_card.innerHTML=`
        <div class="card-title-button">
            <h3>${category}</h3>
            <a href="./pages/${category}.html">ver</a>
        </div>
        <img src="${producto_category.img}" height="100%">
        `;
        categories_container.appendChild(category_card);
    })
}
function displayProductos(productos){
    const cards_container=document.getElementById("cards-container");
    productos.forEach((producto)=>{
        if(document.title.includes(producto.categoria)){
            const preview_card=document.createElement("div");
            preview_card.className="preview-card";
            preview_card.innerHTML=`
            <div class="card-title-button">
                <h4>${producto.nombre}</h4>
                <button class="pink-shadow-button" onclick="comprar('${producto.id}')">&#10010</button>
            </div>
            <img src=".${producto.img}" height="100%">
            `;
            cards_container.appendChild(preview_card);
        }
    })
}

let carritoVisible=false;

function comprar(id){
    const producto_elegido=productos_stock.find((producto)=>producto.id==id);
    const carrito=JSON.parse(localStorage.getItem('carrito'))||[];

    const producto_en_carrito=carrito.find((producto)=>producto.id==id);
    producto_en_carrito ? producto_en_carrito.cantidad++ : carrito.push({...producto_elegido, cantidad:1});
    localStorage.setItem('carrito', JSON.stringify(carrito));
    if(carritoVisible){
        mostrarCarrito();
    };
}

function mostrarCarrito(){
    let precioTotal=0;
    const carrito_section=document.getElementById("carrito-preview-section");
    carrito_section.innerHTML=`
    <hr>
    <h2>Carrito</h2>`;
    const carrito=JSON.parse(localStorage.getItem('carrito'))||[];
    carrito.forEach(({id, nombre, precio, cantidad})=>{
        carrito_section.innerHTML+=`
            <p>- ${nombre} $${precio} x${cantidad} <button class="pink-shadow-button" onclick="quitarDelCarrito('${id}')">&#8722</button></p>
        `;
        precioTotal+=(precio*cantidad);
    });
    const resumen_section=document.createElement("div");
    resumen_section.className="resumenSection";
    resumen_section.innerHTML+=`
    <p><b>Total: $${precioTotal}</b></p>
    <button class="pink-shadow-button" onclick="limpiarCarrito()">Limpiar</button>
    `;
    carrito_section.appendChild(resumen_section);
    carritoVisible=true;
}
const carrito_button=document.getElementById("carritoButton");
carrito_button.addEventListener('click', function(){
    mostrarCarrito();
})

function quitarDelCarrito(id){
    const carrito=JSON.parse(localStorage.getItem('carrito'));
    const producto_en_carrito=carrito.find((producto)=>producto.id==id);
    producto_en_carrito.cantidad>1 ? producto_en_carrito.cantidad-- : carrito.splice(carrito.indexOf(producto_en_carrito),1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    if(carritoVisible){
        mostrarCarrito();
    };
}

function limpiarCarrito(){
    localStorage.clear();
    //location.reload();
    const carrito_section=document.getElementById("carrito-preview-section");
    carrito_section.innerHTML='';
    carritoVisible=false;
}

