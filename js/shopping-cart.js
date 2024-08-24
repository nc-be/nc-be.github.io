import { category, subcategories } from './products.js';

const cart = () => {
    let iconCart = document.querySelector('.icon-cart');
    let closeButton = document.querySelector('.cartContainer .btn-close');
    let body = document.querySelector('body');
    let cartProducts = [];

    // Estos eventos hacen que el boton 'cerrar' o el icono del carrito cierren la ventana del carrito (en realidad la mueve a la izquierda 400px de su posc. inicial)
    iconCart.addEventListener('click', () => {
        body.classList.toggle('cartContainerON')
    });
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
                    quantity: Number(quantity)
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
        displayData(cartProducts);
    };

    // Mostrar informacion para visualizar: Lista de items del carrito - Manejo del contador del carrito (span del icono del carrito)
    const displayData = (cartProducts) => {
        let cartList = document.querySelector('.cartList');
        let iconCartSpan = document.querySelector('.icon-cart span');
        let totalItems = 0; // Cantidad pred. en el span del carrito
        cartList.innerHTML = null; // Vaciar lista de productos antes de añadir
        /* localStorage.clear(); */ // Clear localStorage (DEV CONSOLE)
        // FALTA AGREGAR NOTAS

        cartProducts.forEach(item => {
            totalItems = totalItems + item.quantity;
            let productPosition = category[item.categoryId].findIndex((value) => value.id == item.product_id);
            
            let info = category[item.categoryId][productPosition];
            
            let newCartProduct = document.createElement('div');
            newCartProduct.classList.add('item');
            newCartProduct.classList.add('product');

            newCartProduct.innerHTML =
                `
                <div class="cart-image">
                    <div class="image">
                        <img src="${info.image}" />
                    </div>
                </div>
                <div class="cart-info">
                    <div class="name">
                        ${info.name}
                    </div>
                    <div class="product-id">
                        <h2>
                            CODIGO:
                        </h2>
                        <h3>
                        ${info.id}
                        </h3>
                    </div>
                    <div class="cart-quantities">
                        <button class="delete ${item.categoryId}" data-id='${info.id}' data-idc='${item.categoryId}'>X</button>
                        <button class="cart-minus ${item.categoryId}" data-id='${info.id}' data-idc='${item.categoryId}'>-</button>
                        <span class="quantity-cart" id='cart${info.id}' data-id='${info.id}' data-idc='${item.categoryId}'>${item.quantity}</span>
                        <button class="cart-plus ${item.categoryId}" data-id='${info.id}' data-idc='${item.categoryId}'>+</button>
                    </div>
                </div>`;

            cartList.appendChild(newCartProduct);
        });
        if (totalItems <= 9) {
            iconCartSpan.innerText = '0' + totalItems;
    }
        else{
            iconCartSpan.innerText = totalItems;
        }
        }
        

    var finishButton = document.querySelector('.btn-finish');
        finishButton.addEventListener('click', (event) => {
        finishButton.innerHTML = null;
        let element_a = document.createElement('a');
        element_a.innerHTML = `Finalizar`
        element_a.href = `./../html/finish.html?`;
        
        cartProducts.forEach(item => {
            if (item == cartProducts[Number(cartProducts.length)-1]){
                element_a.href += `id=${item.product_id}&q=${item.quantity}`
            }else{
                element_a.href += `id=${item.product_id}&q=${item.quantity}&`
            }
        });

        finishButton.appendChild(element_a);
        setTimeout(() => {
            location.reload();
        }, 1000);
        
        element_a.click()
    });

    
    
    /* Evento para agregar items al carrito
    Este evento se produce cuando el sistema identifica que se ha hecho click en algun sitio de la pagina */
    document.addEventListener('click', (event) => {
        let target = event.target; // Identificador del elmento clickeado
        
        let productId = target.dataset.id; // id registrado en el boton (0 value pred)
        let categoryId = target.dataset.idc; // clase no 2 registrado en el target (siempre sera la categoria del producto)

        let productPosition = cartProducts.findIndex((value) => value.
        product_id == productId); // Determina la posicion del producto dentro del carrito (En caso de que ya exista el producto, su valor sera >= 0));
        let quantity = productPosition < 0 ? 0 : cartProducts[productPosition].quantity; // Determina la cantidad de productos del mismo id, su valor inicial es 0 si no se ha registrado, en caso contrario se aumenta en 1 segun la posicion calculada
        
        let quantityCartId = document.getElementById(`product${productId}`);
        let quantityCartId2 = document.getElementById(`details${productId}`);
        let quantityCartId3 = document.getElementById(`cart${productId}`);
        
        // Condicional se activa cuando se clickee cualquiera de los botones de agregar/eliminar carrito (utilizando el boton de la lista de productos o el plus del carrito de compras)
        if(target.classList.contains('addCart')){
            if(quantityCartId.value == 0){
                quantityCartId.value = 1;
            }
            
            for (let i = 0; i < quantityCartId.value; i++) {
                quantity++;
            }
            console.log(quantity, productPosition, productId, categoryId, cartProducts);
            
            addToCart(quantity, productPosition, productId, categoryId);

        }else if(target.classList.contains('addCartDetails')){
            if(quantityCartId2.value == 0){
                quantityCartId2.value = 1;
            }
            
            for (let i = 0; i < quantityCartId2.value; i++) {
                quantity++;
            }

            addToCart(quantity, productPosition, productId, categoryId);

        }else if(target.classList.contains('product-plus-details')){
            quantityCartId2.value = Number(quantityCartId2.value)+1;
        } else if(target.classList.contains('product-minus-details') && Number(quantityCartId2.value) > 1){
            quantityCartId2.value = Number(quantityCartId2.value)-1;

        }else if(target.classList.contains('product-plus')){
            quantityCartId.value = Number(quantityCartId.value)+1;
        } else if(target.classList.contains('product-minus') && Number(quantityCartId.value) > 1){
            quantityCartId.value = Number(quantityCartId.value)-1;
        }
        
        else if (target.classList.contains('cart-plus')) {
            quantity++;
            addToCart(quantity, productPosition, productId, categoryId);
        }else if(target.classList.contains('cart-minus')){
            quantity--;
            addToCart(quantity, productPosition, productId, categoryId);
        } else if(target.classList.contains('delete')){
            quantity = 0;
            addToCart(quantity, productPosition, productId, categoryId);
        }
    });

    // Funciona mientras que el sitio web esta en uso, se encarga de chequear si ya existian productos dentro del carrito, si se cumple, guardan la informacion de los productos en 'cartProducts' y procede al display utilizando la funcion 'initApp'
    const initApp = () => {
        console.log('test initApp');
        if (localStorage.getItem('cart')) {
            cartProducts = JSON.parse(localStorage.getItem('cart'));
            displayData(cartProducts);
        }
    }
    initApp();
}
export default cart;