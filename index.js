import cart from './assets/js/shopping-cart.js';  // Importar carrito
import sections from './assets/js/sections.js';

/* Importar IDs de los archivos temporales (temporary-content.html) para traer el contenido de la lista de productos  */
let app = document.getElementById('temporaryApp');
let temporaryContent = document.getElementById('temporaryContent');


/*  Fetch contenido temporal
    -Contenido temporal - Lista de productos/detalles de productos
    -Contenido actual - contenedor contentContainer vacio o algun contenido temporal que se este utilizando
*/
const loadTemplate = () => {
    fetch('./temporary-content.html')
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

// Funcion para cargar todas las categorias (Aun no se toman en cuenta subcategorias) en la lista 'productsList' de 'contentContainer' (Contenido temporal)
const initApp = () => {
    let productsList = document.querySelector('.productsList');
    productsList.innerHTML = null;  // Borrar contenido actual de lista de productos (Reemplaza contenido temporal que se este mostrando previamente)

    sections.forEach(section => {
        // Se crea un item en cada ciclo para el elemento 'div' creado a continuacion
        let newProduct = document.createElement('div');
        newProduct.classList.add('item');

        // Parametros del item: link de imagen (src-local), nombre producto (h2-local), id producto (dataId-local)
        newProduct.innerHTML =
            `<div>
                <img src='${section.image}'>
                <a href="./category.html?id=${section.id}" 
                class="categories   ">${section.name}</a>
            </div>`;
        productsList.appendChild(newProduct);
    });
}