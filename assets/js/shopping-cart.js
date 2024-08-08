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
    const addToCart = (quantity, productPosition, productId) => {
        if (quantity > 0) {
            if (productPosition < 0) {
                cartProducts.push({
                    product_id: productId,
                    quantity: quantity
                })
            }else {
                cartProducts[productPosition].quantity = quantity;
            }
        }
        
        displayData();
    };

    /* Evento para agregar items al carrito
    Este evento se produce cuando el sistema identifica que se ha hecho click en alguno de los botones de la lista de productos */
    document.addEventListener('click', (event) => {
        let target = event.target; // Elemento clickeado (identifica el boton agregar al carrito)
        
        let productId = target.dataset.id; // id registrado en el boton (0 value pred)
        
        let productPosition = cartProducts.findIndex((value) => value.
        product_id == productId); // Determina la posicion del producto dentro del carrito (En caso de que ya exista el producto, su valor sera >= 0));
        
        let quantity = productPosition < 0 ? 0 : cartProducts[productPosition].quantity;
        // Determina la cantidad de productos del mismo id, su valor inicial es 0 si no se ha registrado, en caso contrario se aumenta en 1 segun la posicion calculada

        // Identificador del elmento clickeado, condicional se activa cuando se clickee uno de los botones de agregar a carrito
        if (target.classList.contains('addCart')) {
            // aumentado cantidad para ese producto y se envian datos a procesar
            quantity++;
            addToCart(quantity, productPosition, productId);
        }
    });

    // Mostrar informacion para visualizar: Lista de items del carrito - Manejo del contador del carrito (span del icono del carrito)
    const displayData = () => {
        let cartList = document.querySelector('.cartList');
        let iconCartSpan = document.querySelector('.icon-cart span');
        let totalItems = 0; // Cantidad pred. en el span del carrito
        cartList.innerHTML = null; // Vaciar lista de productos antes de añadir

        // FALTA AGREGAR NOTAS
        cartProducts.forEach(item => {
            totalItems = totalItems + item.quantity;

            let productPosition = products.findIndex((value) => value.id == item.product_id);
            let info = products[productPosition];
            let newCartProduct = document.createElement('div');
            newCartProduct.classList.add('item');

            console.log(productPosition);
            console.log(info);
            

            newCartProduct.innerHTML =
                `<div class="image">
                    <img src="${info.image}" />
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="quantity">
                    <span class="name">-</span>
                    <span>${item.quantity}</span>
                    <span class="name">+</span>
                </div>`;

            cartList.appendChild(newCartProduct);
        });

        iconCartSpan.innerText = totalItems;
    }
}
export default cart;