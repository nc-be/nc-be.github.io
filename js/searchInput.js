import cart from './shopping-cart.js';  // Importar carrito
import search from './search.js';  // Importar carrito
import { categories, category } from './products.js';

/* Importar IDs de los archivos temporales (temporary-content.html) para traer el contenido de la lista de productos  */
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
            /* initApp(); */
            search();
        })
}

loadTemplate()

/* const initApp = () =>{ */
let searchExtracted = new URLSearchParams(window.location.search).get('search');

const keyword = searchExtracted.toUpperCase();
var charSpace = " ";
var charBar = "-";

var itemTracker = 0;
var totalProducts = [];
var productCategory = [];
var categoryIdentifier = 0;

category.forEach(item => {
    item.forEach(str => {
        var index = 0;
        var iterationCounter = 0;
        while (Number(str.name.length) > index) {
            var nameSub = str.name.toUpperCase().substring(index, str.name.length);
            var nameKey = str.name.toUpperCase().substring(index, index + keyword.length);
            
            //console.log(nameSub,'   ',nameKey, nameKey == keyword);
    
            if (nameKey == keyword) {
                //console.log('Product includes the search terms!   ' + iterationCounter);
                productCategory[itemTracker] = categoryIdentifier;
                totalProducts[itemTracker] = str;
                itemTracker++;
                //console.log(totalProducts);
                //console.log('\n');
                break;
            }
            
            // Prevents infinite loops
            iterationCounter++;
            if (iterationCounter >= 8) {
                console.log('Prevent freeze!');
                break;
            }
    
            // Condicional que detecta espacios vacios o '-'
            if(nameSub.indexOf(charSpace)!=-1 || nameSub.indexOf(charBar)!=-1){
                const indexSpace = nameSub.indexOf(charSpace);
                const indexBar = nameSub.indexOf(charBar);
                //console.log('condicional');
                if (indexBar == -1){
                    //console.log('OPC 1');
                    index = indexSpace + index + 1;
                    
                }else if(indexSpace == -1){
                    //console.log('OPC 2');
                    index = indexBar + index + 1;
    
                }else if(indexBar != -1 && indexSpace < indexBar){
                    //console.log('OPC 3');
                    index = indexSpace + index + 1;
                
                }else if(indexSpace != -1 && indexBar < indexSpace){
                    //console.log('OPC 4');
                    index = indexBar + index + 1;
                }
                
            }else{
                //console.log('No spaces/bars left   ' + iterationCounter + '\n');
                index = Number(str.name.length);
            }
    
            //console.log(index);
        }
    });
    categoryIdentifier++;
});
var state = {
    'querySet': totalProducts,  // Origen de la informacion
    'page': 1,  // Pagina inicial (Primera pagina - el usuario la actualiza)
    'rows': 4,  // Numero de filas por pagina
    'window': 2,    // Numero de paginas mostradas en la seccion pagina (limite - el usuario lo PODRIA actualizar)
}
if (2*Number(totalProducts.length) <= 2*state.rows){
    state.rows = Number(totalProducts.length)
}

var count = 0;
    totalProducts.forEach(function (element) {
        element.categoryId = productCategory[count];
        count++;
    });

displayProducts();

// Esta funcion se encarga de la paginacion
function pagination(querySet, page, rows) {
    // Punto inicial y final de la informacion (Calculada a partir de la pagina actual y el numero de productos a mostrar)
    var trimStart = (page - 1) * rows // Punto inicial
    var trimEnd = trimStart + rows // Punto final

    var trimmedData = querySet.slice(trimStart, trimEnd) // Recorta la informacion para el rango anterior
    var pages = Math.round(querySet.length / rows); // Calcula el numero de paginas que tendra la pagina de productos (en total) - .round se utiliza para redondear hacia arriba el valor ya que puede no ser un numero entero EJ: 21 productos / 5 productos a mostrar por pagina = 4.2 = 5 paginas
    return {
        'querySet': trimmedData,
        'pages': pages,
    }
}

// Esta funcion se encarga del display de los botones para cambiar paginas - Requiere el numero total de paginas como parametro de entrada
function pageButtons(pages) {
    // Seleccionar contenedor de la paginacion y limpiar su contenido
    var wrapper = document.querySelector('.pagination')
    wrapper.innerHTML = ``;

    // Definir valores minimos y maximos de las paginas mostradas segun la pagina actual y el valor de window (state) (se resta/suma a la pagina actual la mitad del limite redondeado hacia abajo)

    var minValue = (state.page - Math.floor(state.window / 2))
    // EJ: page 5 limit 5   -   5-(5/2)R = 3 <- primera pagina mostrada
    var maxValue = (state.page + Math.floor(state.window / 2))
    // EJ: page 5 limit 5   -   5-(5/2)R = 3 <- ultima pagina mostrada

    // Condicionales en caso de que el valor minimo sea <=0 (es decir, que se muestre la pagina 0 o negativa) y el maximo supere al total
    if (state.rows >= totalProducts.length) {
        minValue=1;
        maxValue=1;
    }else{
        if (minValue < 1) { // caso <= 0
            minValue = 1
            maxValue = state.window // Valor maximo sera igual al limite de paginas mostradas
        }
    
        if (maxValue > pages && state.rows < totalProducts.length) { // caso > total de paginas
            minValue = pages - (state.window - 1) // Valor minimo sera igual al total menos el limite mostrado
    
            // En caso de que el limite mostrado (window) sea mayor a el numero de total de paginas, este condicional impida que la resta anterior sea negativa y limita el valor minimo a 1
            if (minValue < 1) {
                minValue = 1
            }
            maxValue = pages
        }
    }

    // Crear botones que representan las paginas (+= crea un nuevo boton cada para el contenedor wrapper adicional al que ya se encuentra)
    for (let page = minValue; page <= maxValue; page++){
        wrapper.innerHTML += `<button value=${page} class="page btn page-buttons">${page}</button>`
    }

    // Condicionales para los botones de paginacion que representaran la primera y ultima pagina
    if (state.page != 1) { // Caso primera pagina
        // En caso de que la pagina actual no sea 1 se mostrara el boton a continuacion
        wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-info">&#171; First</button>` + wrapper.innerHTML
    }
    if (state.page != pages) { // Caso ultima pagina
        // En caso de que la pagina actual no sea igual al total de paginas (ultima) se mostrara el boton a continuacion
        wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-info">Last &#187;</button>`
    }

    // Evento jQuery onClick implementado para crear nuevo contenido en la lista de productos
    $('.page').on('click', function () {
        
        $('.productsList').empty() // Limpia el contenido actual de la lista de productos

        state.page = Number($(this).val()) // Redifine state.page con el valor del boton clickeado (Primera/Ultima/X pagina)

        displayProducts()
    })
}

function displayProducts() {
    let productsList = document.querySelector('.productsList');
    productsList.innerHTML = null;
    
    var data = pagination(state.querySet, state.page, state.rows);
    var newProducts = data.querySet;
    
    newProducts.forEach(item => {
        // Se crea un item en cada ciclo para el elemento 'div' creado a continuacion
        let row = document.createElement('div');
        row.classList.add('item');

        row.innerHTML = 
            `<a href="./details.html?id=${item.id}&idc=${item.categoryId}" 
            class="details"><img src=${item.image}></a>
            <h2>${item.name}</h2>
            <div class="product-content">
                <div class="quantities">
                    <button class='product-minus' data-id='${item.id}'
                    data-idc='${item.categoryId}'> - </button>
                    <input class="quantity-cart" id='product${item.id}' value = "1" type="number">
                    <button class='product-plus' data-id='${item.id}'
                    data-idc='${item.categoryId}'> + </button>
                </div>
                <button 
                    class="addCart" 
                    data-id='${item.id}'
                    data-idc='${item.categoryId}'>
                    Agregar al carrito
                </button>
            </div>
            `;

        productsList.append(row);
    })
    pageButtons(data.pages);
}

/* } */
/* const gohere = (totalProducts) => {
    
} */