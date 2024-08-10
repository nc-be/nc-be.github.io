import products from './products.js';
const cart = () => {
    let iconCart = document.querySelector('.icon-cart');
    let closeButton = document.querySelector('.cartContainer .btn-close');
    let body = document.querySelector('body');
    let cartProducts = [];

    // Estos eventos hacen que el boton 'cerrar' o el icono del carrito cierren la ventana del carrito (en realidad la mueve a la izquierda 400px de su posc. inicial)
    iconCart.addEventListener('click', () => {
        body.classList.toggle('cartContainerON')
    })
    closeButton.addEventListener('click', () => {
        body.classList.toggle('cartContainerON')
    })

    // Dependiendo de cantidad y posicion se determina el valor agregado a cantidad del producto especificado (Funciona en conjunto con el siguiente Event Listener)
    const addToCart = (quantity, productPosition, productId, categoryId) => {
        if (quantity > 0) {
            if (productPosition < 0) {
                cartProducts.push({
                    product_id: productId,
                    categoryId: categoryId,
                    quantity: quantity
                })
            }else {
                cartProducts[productPosition].quantity = quantity;
            }
        }else{
            // Cuando la cantidad es 1 y se presiona el boton ("minus") del carrito se borrara el producto de la lista (la cantidad recibida en este punto es 0)
            cartProducts.splice(productPosition, 1);
        }

        // localStorage se encargara de retener la informacion que se encuentra en el carrito de compras para el usuario actual, es decir, si se apaga el dispositivo o cierra la pagina se guardaran los productos agregados
        localStorage.setItem('cart', JSON.stringify(cartProducts));
        displayData();
    };

    // Mostrar informacion para visualizar: Lista de items del carrito - Manejo del contador del carrito (span del icono del carrito)
    const displayData = () => {
        let cartList = document.querySelector('.cartList');
        let iconCartSpan = document.querySelector('.icon-cart span');
        let totalItems = 0; // Cantidad pred. en el span del carrito
        cartList.innerHTML = null; // Vaciar lista de productos antes de añadir
        /* localStorage.clear(); */ // Clear localStorage (DEV CONSOLE)
        // FALTA AGREGAR NOTAS
        cartProducts.forEach(item => {
            console.log(item);
            
            totalItems = totalItems + item.quantity;
            let productPosition = products[item.categoryId].findIndex((value) => value.id == item.product_id);
            
            let info = products[item.categoryId][productPosition];
            
            let newCartProduct = document.createElement('div');
            newCartProduct.classList.add('item');

            newCartProduct.innerHTML =
                `<div class="image">
                    <img src="${info.image}" />
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="quantity">
                    <span class="minus ${item.categoryId}" data-id='${info.id}'>-</span>
                    <span>${item.quantity}</span>
                    <span class="plus ${item.categoryId}" data-id='${info.id}'>+</span>
                </div>`;

            cartList.appendChild(newCartProduct);
        });

        iconCartSpan.innerText = totalItems;
    }

    /* Evento para agregar items al carrito
    Este evento se produce cuando el sistema identifica que se ha hecho click en algun sitio de la pagina */
    document.addEventListener('click', (event) => {
        let target = event.target; // Identificador del elmento clickeado
        
        let productId = target.dataset.id; // id registrado en el boton (0 value pred)
        console.log(productId);
        
        let categoryId = target.dataset.id2; // clase no 2 registrado en el target (siempre sera la categoria del producto)
        console.log(productId);

        let productPosition = cartProducts.findIndex((value) => value.
        product_id == productId); // Determina la posicion del producto dentro del carrito (En caso de que ya exista el producto, su valor sera >= 0));
        
        let quantity = productPosition < 0 ? 0 : cartProducts[productPosition].quantity; // Determina la cantidad de productos del mismo id, su valor inicial es 0 si no se ha registrado, en caso contrario se aumenta en 1 segun la posicion calculada

        // Condicional se activa cuando se clickee cualquiera de los botones de agregar/eliminar carrito (utilizando el boton de la lista de productos o el plus del carrito de compras)
        if (target.classList.contains('addCart') || target.classList.contains('plus')) {
            // aumentado cantidad para ese producto y se envian datos a procesar
            quantity++;
            addToCart(quantity, productPosition, productId, categoryId);
        }else if(target.classList.contains('minus')){
            quantity--;
            addToCart(quantity, productPosition, productId, categoryId);
        }
    });

    // Funciona mientras que el sitio web esta en uso, se encarga de chequear si ya existian productos dentro del carrito, si se cumple, guardan la informacion de los productos en 'cartProducts' y procede al display utilizando la funcion 'initApp'
    const initApp = () => {
        if (localStorage.getItem('cart')) {
            cartProducts = JSON.parse(localStorage.getItem('cart'));
        }
        displayData();
    }
    initApp();
}
export default cart;