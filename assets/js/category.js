import cart from './../js/shopping-cart.js';
import { category, subcategories } from './../js/products.js';

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
    var subcategoryId = null;
    // detailsProductId y detailCategoryId extraen los ids de la URL
    let URLdata = new URLSearchParams(window.location.search).get('idc');
    
    // try catch en caso de que se ingrese ud productId incorrecto (NOTA: NO SE PUEDE USAR UN categoryId DISTINTO A LA CATEGORIA/SUBCATEGORIA ACTUAL, YA QUE NO SE HA GENERADO ESE PRODUCTO Y EL RESULTADO ES undefined)
    try {
        let digits = (URLdata.toString().split('')).map(Number)
        let categoryId = digits[0];
        let newProducts = category[categoryId];  
        if (URLdata.length >= 2) {
            var subcategoryId = digits[1];
            
        }
        
        displayProduct(newProducts, categoryId, subcategoryId);

        if (!newProducts) {
            console.log('Product doesnt exist 1');
           /*  window.location.href='./categories.html' */
        }
    } catch (error) {
        console.log('Product doesnt exist 2');
        /* window.location.href='./categories.html' */
    }
}

const verifySubcategory = (item, subcategoryId) => {
        let subExtracted = (item.id).charAt((item.id).length - 1);
        console.log(subExtracted,subcategoryId);
        
        if (subExtracted == subcategoryId) {
            return true;
        }
        else{
            return null;
        }
        // Parametros del item: link de imagen (src-local), nombre producto (h2-local), id producto (dataId-local)
};

const displayProduct = (newProducts, categoryId, subcategoryId) => {
    // Se crea un item en cada ciclo para el elemento 'div' creado a continuacion
    let productsList = document.querySelector('.productsList');
    productsList.innerHTML = null;
    
    newProducts.forEach(item => {
    // Se crea un item en cada ciclo para el elemento 'div' creado a continuacion
    let newProduct = document.createElement('div');
    newProduct.classList.add('item');
    
    var verify = verifySubcategory(item, subcategoryId);
    
    console.log(verify, subcategoryId);
    /* console.log(verify==null);
    console.log(subcategoryId);
    console.log(subcategoryId!=null);
     */

    if(subcategoryId==null || verify==true && subcategoryId!=null)
    {// Parametros del item: link de imagen (src-local), nombre producto (h2-local), id producto (dataId-local)
    newProduct.innerHTML =
        `<a href="./details.html?id=${item.id}&idc=${categoryId}" 
        class="details"><img src=${item.image}></a>
        <h2>${item.name}</h2>
        <button 
            class="addCart" 
            data-id='${item.id}'
            data-idc='${categoryId}'>
            Agregar al carrito
        </button>`;
    productsList.appendChild(newProduct);}   
    })
};