const search = () => {
    let searchInput = document.querySelector('.input-search');
    let content = document.getElementById('contentContainer');
    let body = document.querySelector('body');
    let header = document.querySelector('header');

    // Estos eventos hacen que al hacer click en el input este se agrande y al hacer click en cualquier otro espacio *cuando el input esta activo* se reduzca, ESTO DEBE IR EN UN js APARTE (PARA EJECUTARLO EN CADA PAGINA)
    searchInput.addEventListener('click', () => {
        if(body.classList != 'openSearchbarON'){
        body.classList.toggle('openSearchbarON');
    }
    })
    content.addEventListener('click', () => {
        if(body.classList == 'openSearchbarON'){
            body.classList.toggle('openSearchbarON')
        }
    })
    header.addEventListener('click', (event) => {
        if(body.classList == 'openSearchbarON' && event.target.classList != 'input-search' ){
            body.classList.toggle('openSearchbarON')
        }
    })

    searchInput.addEventListener('keyup', (event) => {
    var target = event.target.value;

        if(event.key == ' ' || event.keyCode === 32 || event.key === 'Spacebar' || event.key === 'Space'){
            if (target.length <= 1) {
                searchInput.value = null;
            }
        }
        
        if(target !=null){
            let generatedButton = document.querySelector('.button-search');
            generatedButton.href = `./../html/search.html?search=${searchInput.value}`
            if(event.key === 'Enter' && generatedButton.innerHTML != null){
                generatedButton.click();
            }
        }
    });
}
export default search;