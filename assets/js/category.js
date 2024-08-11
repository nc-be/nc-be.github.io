import cart from './../js/shopping-cart.js';
import products from './../js/products.js';

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
    var categoryId = new URLSearchParams(window.location.search).get('id');
    
    // try catch en caso de que se ingrese ud productId incorrecto (NOTA: NO SE PUEDE USAR UN categoryId DISTINTO A LA CATEGORIA ACTUAL, YA QUE NO SE HA GENERADO ESE PRODUCTO Y EL RESULTADO ES undefined)
    try {
        var newProducts = products[categoryId];
        console.log(newProducts);
        console.log(categoryId);
    
        finalStep(newProducts, categoryId);

        if (!newProducts) {
            console.log('Product doesnt exist 1');
            window.location.href='./categories.html'
        }
    } catch (error) {
        console.log('Product doesnt exist 2');
        window.location.href='./categories.html'
    }
}

const finalStep = (newProducts, categoryId) => {
    console.log(newProducts);

    let productsList = document.querySelector('.productsList');
    productsList.innerHTML = null;    
    newProducts.forEach(item => {
        // Se crea un item en cada ciclo para el elemento 'div' creado a continuacion
        let newProduct = document.createElement('div');
        newProduct.classList.add('item');

        // Parametros del item: link de imagen (src-local), nombre producto (h2-local), id producto (dataId-local)
        newProduct.innerHTML =
        `
        <a href="./details.html?id_2=${item.id}&id_3=${categoryId}" 
        class="details"><img src=${item.image}></a>
        <h2>${item.name}</h2>
        <button 
            class="addCart" 
            data-id='${item.id}'
            data-id2='${categoryId}'>
            Agregar al carrito
        </button>`;

        productsList.appendChild(newProduct);
    })
};