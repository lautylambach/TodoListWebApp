let contenedorListas = document.querySelector('[data-listas]')
let nuevaListaForm = document.querySelector('[data-nueva-lista-form]')
let nuevaListaInput = document.querySelector('[data-nueva-lista-input]')
let botonBorrarListas = document.querySelector('[data-borrar-lista-btn]') 




let listas = JSON.parse(localStorage.getItem('listasStorages')) || []
let idListaSelect = localStorage.getItem('SelectListaId')


contenedorListas.addEventListener('click', e =>{
    if (e.target.tagName.toLowerCase() === 'li'){
       idListaSelect = e.target.dataset.listaId
       crearYGuardar()
    }
})

nuevaListaForm.addEventListener('submit', e => {
   e.preventDefault() 
   nombreLista = nuevaListaInput.value
   if(nombreLista == null || nombreLista === '') return
   let lista = crearLista(nombreLista)
   nuevaListaInput.value = null
   listas.push(lista)
   crearYGuardar()
})

botonBorrarListas.addEventListener('click', e =>{
    listas = listas.filter(lista => lista.id !== idListaSelect )
    idListaSelect = null
    crearYGuardar()
})



function crearLista(nombre){
   return {id:Date.now().toString(), nombre: nombre, tareas: []}
}

function guardar(){
    localStorage.setItem('listasStorages',JSON.stringify(listas))
    localStorage.setItem('SelectListaId',JSON.stringify(idListaSelect))
}

function crearYGuardar(){
   guardar() 
   crear()
}

function crear(){
    limpiarElementos(contenedorListas)
    listas.forEach(lista =>{
        let elementoLista = document.createElement('li')
        elementoLista.dataset.listaId=lista.id
        elementoLista.classList.add("nombre-lista")
        elementoLista.innerText = lista.nombre
        if (lista.id === idListaSelect) {
            elementoLista.classList.add('lista-activa')
        }   
        contenedorListas.appendChild(elementoLista)
    })
}

function limpiarElementos(element){
    while(element.firstChild)
    element.removeChild(element.firstChild)
}


crear()