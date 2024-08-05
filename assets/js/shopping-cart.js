let iconCart = document.querySelector('.icon-cart');
let closeButton = document.querySelector('.cartContainer .btn-close');
let body = document.querySelector('body');

// Este evento hace que el boton 'cerrar' o el icono del carrito cierren la ventana del carrito (en realidad la mueve a la izquierda 400px de su posc. inicial)
iconCart.addEventListener('click', () =>{
    body.classList.toggle('cartContainerON')
})
closeButton.addEventListener('click', () =>{
    body.classList.toggle('cartContainerON')
})
