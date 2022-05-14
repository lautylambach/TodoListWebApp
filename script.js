class Lista {
    constructor(id,nombre,tareas){
        this.id=id
        this.nombre=nombre
        this.tareas=tareas
    }
    
}


let contenedorListas = document.querySelector('[data-listas]')
let nuevaListaForm = document.querySelector('[data-nueva-lista-form]')
let nuevaListaInput = document.querySelector('[data-nueva-lista-input]')
let botonBorrarListas = document.querySelector('[data-borrar-lista-btn]') 
let contenedorListaMostrar = document.querySelector('[data-lista-contenedor]') 
let tituloLista = document.querySelector('[data-titulo-lista]')
let contadorLista = document.querySelector('[data-contador-lista]')
let tareasContenedor = document.querySelector('[data-tareas]')
let tareaTemplate = document.getElementById('tarea-template')
let nuevaTareaForm = document.querySelector('[data-nueva-tarea-form]')
let nuevaTareaInput = document.querySelector('[data-nueva-tarea-input]')
let botonBorrarTareas = document.querySelector('[data-borrar-tareas-completas]')





let listas = JSON.parse(localStorage.getItem('listasStorages')) || []
let idListaSelect = localStorage.getItem('SelectListaId')


contenedorListas.addEventListener('click', e =>{
    if (e.target.tagName.toLowerCase() === 'li'){
       idListaSelect = e.target.dataset.listaId
       crearYGuardar()
    }
})

tareasContenedor.addEventListener('click', e => {
   if(e.target.tagName.toLowerCase() === 'input'){
       let listaSeleccionada = listas.find(lista => lista.id === idListaSelect)
       let tareaSeleccionada = listaSeleccionada.tareas.find(tarea => tarea.id === e.target.id)
       tareaSeleccionada.completada = e.target.checked
       guardar()
       crearContador(listaSeleccionada)

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
nuevaTareaForm.addEventListener('submit', e => {
    e.preventDefault() 
    nombreTarea = nuevaTareaInput.value
    if(nombreTarea == null || nombreTarea === '') return
    let tarea = crearTarea(nombreTarea)
    let listaSeleccionada = listas.find(lista => lista.id === idListaSelect)
    listaSeleccionada.tareas.push(tarea)
    crearYGuardar()
 })

botonBorrarTareas.addEventListener('click', e => {
    let listaSeleccionada = listas.find(lista =>lista.id === idListaSelect)
    listaSeleccionada.tareas = listaSeleccionada.tareas.filter(tarea => !tarea.completada)
    crearYGuardar()
})

botonBorrarListas.addEventListener('click', e =>{
    listas = listas.filter(lista => lista.id !== idListaSelect )
    idListaSelect = null
    crearYGuardar()
})

function crearTarea(nombre){
    return {id:Date.now().toString(), nombre: nombre, completada: false}
}

function crearLista(nombre){
   return let = new Lista (Date.now().toString(), nombre,[])
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
    crearListas()
    let listaSeleccionada = listas.find(lista => lista.id === idListaSelect) ?? console.log('seleccione una lista')  
    console.log(listaSeleccionada)
    if(idListaSelect == null){
        contenedorListaMostrar.style.display = 'none'
    }else{
        contenedorListaMostrar.style.display =''
        tituloLista.innerText = listaSeleccionada.nombre 
        console.log(listaSeleccionada.nombre)
        crearContador(listaSeleccionada)
        limpiarElementos(tareasContenedor)
        crearTareas(listaSeleccionada)
    }
}

function crearTareas(listaSeleccionada){
    listaSeleccionada.tareas.forEach(tarea =>{
        let elementoTarea =document.importNode(tareaTemplate.content, true)
        let checkbox = elementoTarea.querySelector('input')
        checkbox.id = tarea.id
        checkbox.checked = tarea.completada
        let label = elementoTarea.querySelector('label')
        label.htmlFor = tarea.id
        label.append(tarea.nombre)
        tareasContenedor.appendChild(elementoTarea)
    })
}

function crearContador(listaSeleccionada){
    let tareasIncompletasContador = listaSeleccionada.tareas.filter(tarea => !tarea.completada).length
    let tareaString = tareasIncompletasContador === 1 ? "tarea" : "tareas"
    contadorLista.innerText = `${tareasIncompletasContador} ${tareaString} sin completar `
}

function crearListas(){
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