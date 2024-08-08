import cart from './shopping-cart.js';  // Importar carrito
import products from './../js/products.js';

/* Importar IDs de los archivos temporales (temporary-content.html) para traer el contenido de la lista de productos  */
let app = document.getElementById('temporaryApp');
let temporaryContent = document.getElementById('temporaryContent');


/*  Fetch contenido temporal
    -Contenido temporal - Lista de productos/detalles de productos
    -Contenido actual - contenedor contentContainer vacio o algun contenido temporal que se este utilizando
*/
const loadTemplate = () => {
    fetch('./../html/category1.html')
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
    console.log(products); // Imprimir lista de productos a visualizar en consola (DEV TEST BORRAR LUEGO)
    productsList.innerHTML = null;  // Borrar contenido actual de lista de productos (Reemplaza contenido temporal que se este mostrando previamente)

    /* Ciclo para mostrar cada uno de los productos
    Los productos agregados al array cuentan con 4 atributos: id, name, image, description. En la lista de productos solo se mostrara name, image y un boton para agregan al carrito que envia su id.
    */
    products.forEach(product => {
        // Se crea un item en cada ciclo para el elemento 'div' creado a continuacion
        let newProduct = document.createElement('div');
        newProduct.classList.add('item');

        // Parametros del item: link de imagen (src-local), nombre producto (h2-local), id producto (dataId-local)
        newProduct.innerHTML =
        `<img src="${product.image}">
        <h2>${product.name}</h2>
        <button 
            class="addCart" 
            data-id='${product.id}'>
            Agregar al carrito
        </button>`;

        productsList.appendChild(newProduct);
    });
}
