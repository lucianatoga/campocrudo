const productos_stock=[];
async function traerProductos(){
        const response= await fetch("/productos.json");
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
                <button id="comprar-button" class="pink-shadow-button" onclick="comprar('${producto.id}')">&#10010</button>
            </div>
            <img src=".${producto.img}" height="100%">
            `;
            cards_container.appendChild(preview_card);
        }
    })
}

//CARRITO//

function contarProductos(){
    let contador=0;
    const carrito=JSON.parse(localStorage.getItem('carrito'))||[];
    carrito.length===0 ? contador=0 : carrito.forEach(producto=>contador+=producto.cantidad);
    const contador_html=document.getElementById("contador");
    contador_html.innerHTML=`${contador}`;
}
contarProductos();

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
    Toastify({
        text: "✔",
        duration: 1000,
        className: "notificacion",
        backgroundColor:"rgba(188, 143, 143, 0.692)"
    }).showToast();
    contarProductos();
}

function mostrarCarrito(){
        let precioTotal=0;
        const carrito_section=document.getElementById("carrito-preview-section");
        const resumen_section=document.getElementById("carrito-inner-section");
        resumen_section.innerHTML=``;
        const carrito=JSON.parse(localStorage.getItem('carrito'))||[];
        if(carrito.length<1){
            resumen_section.innerHTML+=`
            <p>El carrito está vacío</p>
            <button class="pink-shadow-button" onclick="cerrarCarrito()">Cerrar</button>`;
        }
        else{
            const table=document.createElement('table');
            table.className="products-table";
            table.innerHTML+=`
            <tr>
                <th>preview</th>
                <th>producto</th>
                <th>precio</th>
                <th>cantidad</th>
            </tr>`;
            carrito.forEach(({id, nombre, precio, cantidad, img})=>{
                table.innerHTML+=`
                <tr>
                    <td><img src=".${img}" width="80%"></td>
                    <td>${nombre}</td>
                    <td>$${precio}</td>
                    <td>x${cantidad}</td>
                    <td><button class="pink-shadow-button" onclick="quitarDelCarrito('${id}')">&#8722</button></td>
                    
                </tr>`;
                precioTotal+=(precio*cantidad);
            });
            resumen_section.appendChild(table);
            resumen_section.innerHTML+=`
            <p><b>monto total: $${precioTotal}</b></p>
            <div class="carrito-buttons">
                <button class="pink-shadow-button" onclick="limpiarCarrito()">Limpiar</button>
                <button class="pink-shadow-button" onclick="cerrarCarrito()">Cerrar</button>
            </div>
            `;
        }
        carrito_section.style.width="25rem";
        carrito_section.appendChild(resumen_section);
        carritoVisible=true;
    }

const carrito_button=document.getElementById("carrito-button");
carrito_button.addEventListener('click', function(){
    if(carritoVisible){
        cerrarCarrito();
    }
    else{
        mostrarCarrito();
    }
});

function quitarDelCarrito(id){
    const carrito=JSON.parse(localStorage.getItem('carrito'));
    const producto_en_carrito=carrito.find((producto)=>producto.id==id);
    producto_en_carrito.cantidad>1 ? producto_en_carrito.cantidad-- : carrito.splice(carrito.indexOf(producto_en_carrito),1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
         mostrarCarrito();
    contarProductos();
}

function limpiarCarrito(){
    Swal.fire({
        title: "Deseas limpiar el carrito?",
        text: "Se borrará todo lo guardado",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(207, 154, 154)",
        cancelButtonColor: "rgba(88, 74, 74, 0.692)",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Limpiar",
      }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            contarProductos();
            const carrito_section=document.getElementById("carrito-preview-section");
            carrito_section.style.width="0";
            carritoVisible=false;
            
            Swal.fire({
                title: "Listo!",
                icon: "success",
                confirmButtonColor:"rgb(207, 154, 154)"
            });
        }
      });
}

function cerrarCarrito(){
    const carrito_section=document.getElementById("carrito-preview-section");
    carrito_section.style.width="0";
    carritoVisible=false;
}

//LOGIN//
let loginVisible=false;

function abrirLogin(){
    const login_section=document.getElementById("login-section");
    login_section.style.width="25rem";
    mostrarSignIn();
    loginVisible=true;
}
function mostrarSignIn(){
    const login_inner_section=document.getElementById("login-inner-section");
    login_inner_section.innerHTML=`
        <form>
            <label for="email">email</label><br>
            <input type="email" id="email" name="email" autocomplete="on"><br>
            <label for="psswd">contraseña</label><br>
            <input type="password" id="psswd" name="psswd" autocomplete="on"> <br>
            <input type="submit" value="ingresar" class="login-form-buttons">
        </form>
        <a href="#">Olvidaste tu contraseña?</a>
    `;
    const signup_button=document.getElementById("signup-button");
    signup_button.className="login-buttons-unselected";
    const signin_button=document.getElementById("signin-button");
    signin_button.className="login-buttons-selected";
}
function mostrarSignUp(){
    const login_inner_section=document.getElementById("login-inner-section");
    login_inner_section.innerHTML=`
        <form>
            <label for="fullname">nombre completo</label><br>
            <input type="text" id="fullname" name="fullname" autocomplete="on"><br>
            <label for="email">email</label><br>
            <input type="email" id="email" name="email" autocomplete="on"><br>
            <label for="psswd">contraseña</label><br>
            <input type="password" id="psswd" name="psswd" autocomplete="on"> <br>
            <input type="submit" value="registrarme" class="login-form-buttons">
        </form>
        <a href="#">Ya tienes cuenta?</a>
    `;
    const signin_button=document.getElementById("signin-button");
    signin_button.className="login-buttons-unselected";
    const signup_button=document.getElementById("signup-button");
    signup_button.className="login-buttons-selected";
}
function cerrarLogin(){
    const login_section=document.getElementById("login-section");
    login_section.style.width="0";
    loginVisible=false;
}

const user_button=document.getElementById("user-button");
user_button.addEventListener('click', ()=>{
    if(loginVisible){
        cerrarLogin();
    }
    else{
        abrirLogin();
    }
});
const signin_button=document.getElementById("signin-button");
signin_button.addEventListener('click', ()=>{
    mostrarSignIn();
})
const signup_button=document.getElementById("signup-button");
signup_button.addEventListener('click', ()=>{
    mostrarSignUp();
})

