import cart from './assets/js/shopping-cart.js';  // Importar carrito
import products from './assets/js/products.js';
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

// Funcion para cargar productos en la lista 'productsList' de 'contentContainer' (Contenido temporal)
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
                <button class="categories" id='${section.id}'>
                    ${section.name}
                </button>
            </div>`;
        productsList.appendChild(newProduct);
    });
    selector();
    /* Ciclo para mostrar cada uno de los productos
    Los productos agregados al array cuentan con 4 atributos: id, name, image, description. En la lista de productos solo se mostrara name, image y un boton para agregan al carrito que envia su id.
    */
}

const selector = () => document.addEventListener('click', (event) => {
    let target = event.target;
    if (target.classList.contains('categories')) {
        finalStep(target.id);
    }
});

const finalStep = (categoryId) => {
    let productsList = document.querySelector('.productsList');
    productsList.innerHTML = null;
    products[categoryId].forEach(category => {
        // Se crea un item en cada ciclo para el elemento 'div' creado a continuacion
        let newProduct = document.createElement('div');
        newProduct.classList.add('item');

        // Parametros del item: link de imagen (src-local), nombre producto (h2-local), id producto (dataId-local)
        newProduct.innerHTML =
            `<img src="${category.image}">
        <h2>${category.name}</h2>
        <button 
            class="addCart ${categoryId}" 
            data-id='${category.id}'>
            Agregar al carrito
        </button>`;

        productsList.appendChild(newProduct);
    });
}