import cart from './shopping-cart.js';  // Importar carrito
import { categories, subcategories } from './products.js';
import search from './search.js';

/* Importar IDs de los archivos temporales (temporary-content.html) para traer el contenido de la lista de productos  */
let app = document.getElementById('temporaryApp');
let temporaryContent = document.getElementById('temporaryContent');

/*  Fetch contenido temporal
    -Contenido temporal - Lista de productos/detalles de productos
    -Contenido actual - contenedor contentContainer vacio o algun contenido temporal que se este utilizando
*/
debugger
/* var perfEntries = performance.getEntriesByType("navigation");
if (perfEntries[0].type === "back_forward") {
    location.reload();
} */
const loadTemplate = () => {
    /* debugger */
    fetch('./temporary-content.html')
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

// Funcion para cargar todas las categorias y sucbategorias
const initApp = () => {
    let sectionId = new URLSearchParams(window.location.search).get('section');
    let productsList = document.querySelector('.productsList');
    productsList.innerHTML = null;
    let banner = document.querySelector('.banner');
    /* banner.innerHTML = 'Bienvenido a AgroAndes, comercializadora de productos agricolas' */

    if (sectionId == '1'){
        banner.innerHTML= null;
        banner.innerHTML = 'Maquinaria agricola'; // falta tilde
        var catSelect = [categories[0],categories[1],categories[2],categories[3]];
    }
    else if (sectionId == '2'){
        banner.innerHTML= null;
        banner.innerHTML = 'Insumos agricolas'; // falta tilde
        var catSelect = [categories[4],categories[5]];
    }
    if (sectionId == '1'){
        
        var subcatSelect = [subcategories[0],subcategories[1],subcategories[2],subcategories[3]];
    }
    else if (sectionId == '2'){
        var subcatSelect = [subcategories[4],subcategories[5]];
    }

    var count2 = 0;
    catSelect.forEach(cat => {
        // Se crea un item en cada ciclo para el elemento 'div' creado a continuacion
        var count = 0;
        let newProduct = document.createElement('div');
        newProduct.classList.add('item');
        // Parametros del item: link de imagen (src-local), nombre producto (h2-local), id producto (dataId-local)

        newProduct.innerHTML +=
            `<div class="categories">
                <img src='${cat.image}'>
                <a href="./category.html?idc=${cat.id}" data-id="${cat.id}">${cat.name}</a>
            </div>`;
        productsList.appendChild(newProduct);
        let newSubcategory = document.createElement('div');
        newSubcategory.classList.add('subcategoriesContainer');

        subcatSelect[count2].forEach(subcategory => {
            newSubcategory.innerHTML +=
                `
                <a  href="./category.html?idc=${cat.id}${subcategory.id}" class="subcategories">${subcategory.name}</a>
                `
            newProduct.appendChild(newSubcategory);
            count++;
        });
        count2++;
    });
    
}

