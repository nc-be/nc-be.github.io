import cart from './../js/shopping-cart.js';
import { category, subcategories } from './../js/products.js';
import search from './search.js';

let app = document.getElementById('temporaryApp');
let temporaryContent = document.getElementById('temporaryContent');

const loadTemplate = () => {
    fetch('./../html/temporary-content.html')
        .then(response => response.text())
        .then(html => {
            app.innerHTML = html; // Montar Contenido temporal en la pagina de productos
            let contentTab = document.getElementById('contentContainer');
            contentTab.innerHTML = temporaryContent.innerHTML; // Reemplazar el Contenido actual con Contenido temporal
            temporaryContent.innerHTML = null; // Eliminar el Contenido temporal
            cart(); // Ejecuta eventos para abrir/cerrar carrito
            search();
            initApp();
        })
}

loadTemplate();

const initApp = () =>{
let URLdata = new URLSearchParams(window.location.search).getAll('id');
let URLdata2 = new URLSearchParams(window.location.search).getAll('q');

// console.log(URLdata);
// console.log(URLdata2);

let count = 0;
let productInfo = [];
URLdata.forEach(productId => {
    productInfo[count] = {id : productId.substring(0, productId.length-1), quantity: URLdata2[count]};
    count++;
});
count = 0;

let finalData = document.querySelector('.finalData');
finalData.innerHTML = null;
let element_ul = document.createElement('ul');

productInfo.forEach(item => {
    element_ul.innerHTML += `<li>ID del producto: ${item.id}, Cantidad: ${item.quantity}</li>`
});

finalData.appendChild(element_ul);

}






