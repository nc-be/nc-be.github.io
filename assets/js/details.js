import cart from './../js/shopping-cart.js';
import { category } from './../js/products.js';

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
            initApp();
        })
}

loadTemplate();

// // Funciona mientras que el sitio web esta en uso, se usara para obtener los datos del id del producto y id de su categoria
const initApp = () => {
    // detailsProductId y detailCategoryId extraen los ids de la URL
    let detailProductId = new URLSearchParams(window.location.search).get('id');
    let detailCategoryId = new URLSearchParams(window.location.search).get('idc');
    console.log(detailProductId);
    console.log(detailCategoryId);

    // try catch en caso de que se ingrese ud productId incorrecto (NOTA: NO SE PUEDE USAR UN categoryId DISTINTO A LA CATEGORIA ACTUAL, YA QUE NO SE HA GENERADO ESE PRODUCTO Y EL RESULTADO ES undefined)
    try {
        var info = category[detailCategoryId].filter((value) => value.id == detailProductId)[0];
        console.log(info);
        
        let detail = document.querySelector('.detail');
        detail.querySelector('.image img').src= info.image;
        detail.querySelector('.name').innerText= info.name;
        detail.querySelector('.description').innerText= info.description;
        detail.querySelector('.addCart').dataset.id= detailProductId;
        detail.querySelector('.addCart').dataset.id2= detailCategoryId;

        /* localStorage.clear(); */ // Clear localStorage (DEV CONSOLE)
        if (!info) {
            console.log('Product doesnt exist');
            /* window.location.href='./categories.html' */
        }
    } catch (error) {
        console.log('Product doesnt exist');
        /* window.location.href='./categories.html' */
    }

}