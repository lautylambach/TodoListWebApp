
// app tareas
class Lista {
    constructor(id,nombre,tareas){
        this.id=id
        this.nombre=nombre
        this.tareas=tareas
    }
    
}
//variables del DOM
//Fecha
let fechaNumero = document.getElementById('fechaNumero')
let fechaMes= document.getElementById('fechaMes')
let fechaAnno= document.getElementById('fechaAnno')
let fechaTexto= document.getElementById('fechaTexto')
//Listas
let contenedorListas = document.querySelector('[data-listas]')
let nuevaListaForm = document.querySelector('[data-nueva-lista-form]')
let nuevaListaInput = document.querySelector('[data-nueva-lista-input]')
let botonBorrarListas = document.querySelector('[data-borrar-lista-btn]') 
let contenedorListaMostrar = document.querySelector('[data-lista-contenedor]') 
let tituloLista = document.querySelector('[data-titulo-lista]')
let contadorLista = document.querySelector('[data-contador-lista]')
//Tareas
let tareasContenedor = document.querySelector('[data-tareas]')
let tareaTemplate = document.getElementById('tarea-template')
let nuevaTareaForm = document.querySelector('[data-nueva-tarea-form]')
let nuevaTareaInput = document.querySelector('[data-nueva-tarea-input]')
let botonBorrarTareas = document.querySelector('[data-borrar-tareas-completas]')

//local storage
let listas = JSON.parse(localStorage.getItem('listasStorages')) || []
let idListaSelect = localStorage.getItem('SelectListaId')


//event listeners
//seleccionador de lista
contenedorListas.addEventListener('click', e =>{
    if (e.target.tagName.toLowerCase() === 'li'){
       idListaSelect = e.target.dataset.listaId
       crearYGuardar()
    }
})
//seleccionador de tarea y check
tareasContenedor.addEventListener('click', e => {
   if(e.target.tagName.toLowerCase() === 'input'){
       let listaSeleccionada = listas.find(lista => lista.id === idListaSelect)
       let tareaSeleccionada = listaSeleccionada.tareas.find(tarea => tarea.id === e.target.id)
       tareaSeleccionada.completada = e.target.checked
       guardar()
       crearContador(listaSeleccionada)

   } 
})
// input de nombre de lista
nuevaListaForm.addEventListener('submit', e => {
   e.preventDefault() 
   nombreLista = nuevaListaInput.value
   if(nombreLista == null || nombreLista === '') return
   let lista = crearLista(nombreLista)
   nuevaListaInput.value = null
   listas.push(lista)
   crearYGuardar()
   Toastify({
    text: `Se creo la lista ${lista.nombre}`,
    duration: 3000,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
        background: "linear-gradient(to right, #E1DCCE, #DDD0B9)"},
    }).showToast();
   
})
//input nombre tarea
nuevaTareaForm.addEventListener('submit', e => {
    e.preventDefault() 
    nombreTarea = nuevaTareaInput.value
    if(nombreTarea == null || nombreTarea === '') return
    let tarea = crearTarea(nombreTarea)
    let listaSeleccionada = listas.find(lista => lista.id === idListaSelect)
    listaSeleccionada.tareas.push(tarea)
    nuevaTareaInput.value = null
    crearYGuardar()
    Toastify({
        text: `Se creo nueva tarea en lista ${listaSeleccionada.nombre}`,
        duration: 3000,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #E1DCCE, #DDD0B9)"},
        }).showToast();
 })
// boton borrar tareas completas
botonBorrarTareas.addEventListener('click', e => {
    let listaSeleccionada = listas.find(lista =>lista.id === idListaSelect)
    listaSeleccionada.tareas = listaSeleccionada.tareas.filter(tarea => !tarea.completada)
    crearYGuardar()
    Toastify({
        text: `Se borraron las tareas completadas de la lista ${listaSeleccionada.nombre}`,
        duration: 3000,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #E1DCCE, #DDD0B9)"},
        }).showToast();
})
//boton borrar listas
botonBorrarListas.addEventListener('click', e =>{
    let listaSeleccionada = listas.find(lista =>lista.id === idListaSelect)
    Toastify({
        text: `Se borro la lista ${listaSeleccionada.nombre}`,
        duration: 3000,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #E1DCCE, #DDD0B9)"},
        }).showToast();
    
    listas = listas.filter(lista => lista.id !== idListaSelect )
    idListaSelect = null
    crearYGuardar()
    
})

//funciones

//funcion que genera la fecha actual
let crearFecha = () => {
    let fecha = new Date()
    fechaNumero.textContent = fecha.toLocaleString('es', {day:'numeric'})
    fechaTexto.textContent = fecha.toLocaleString('es', {weekday:'long'})
    fechaMes.textContent = fecha.toLocaleString('es', {month:'short'})
    fechaAnno.textContent = fecha.toLocaleString('es', {year:'numeric'})

}
//funcion crear tarea
function crearTarea(nombre){
    return {id:Date.now().toString(), nombre: nombre, completada: false}
}
//funcion crear lista
function crearLista(nombre){
   return let = new Lista (Date.now().toString(), nombre,[])
}
//guardar local storage
function guardar(){
    localStorage.setItem('listasStorages',JSON.stringify(listas))
    localStorage.setItem('SelectListaId',JSON.stringify(idListaSelect))
}
// funcion crear+guardar
function crearYGuardar(){
   guardar() 
   crear()
   
}

// funcion que crea el visor de tareas sin realizar
function crearContador(listaSeleccionada){
    let tareasIncompletasContador = listaSeleccionada.tareas.filter(tarea => !tarea.completada).length
    let tareaString = tareasIncompletasContador === 1 ? "tarea" : "tareas"
    contadorLista.innerText = `${tareasIncompletasContador} ${tareaString} sin completar `
}

//funcion que crea el contenido para las tareas
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

// funcion que crea el contenido de listas
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

// funcion que limpia los elementos previos del html
function limpiarElementos(element){
    while(element.firstChild)
    element.removeChild(element.firstChild)
}

//funcion que crea la estructura
function crear(){
    limpiarElementos(contenedorListas)
    crearListas()
    crearFecha()
    let listaSeleccionada = listas.find(lista => lista.id === idListaSelect) ?? console.log('seleccione lista ') 
    
    if(idListaSelect == null){
        contenedorListaMostrar.style.display = 'none'
    }else{
        tareaTryCatch(listaSeleccionada)
        }
}
function tareaTryCatch(listaSeleccionada){
      try{
            contenedorListaMostrar.style.display =''
            tituloLista.innerText = listaSeleccionada.nombre //error si no se selecciona una lista -- se debera aplicar un try finally
            crearContador(listaSeleccionada)
            limpiarElementos(tareasContenedor)
            crearTareas(listaSeleccionada)
        }catch{
            tituloLista.innerText = 'Seleccione una lista'
            } 
        }

//se llama la funcion inicial
crear()

//app clima

// variables para clima
let lon
let lat
let apiKey = '15d633172c67b99e7578200d5feb4e1e'
// variables para el dom
let temperaturaValor = document.getElementById('temperatura-valor')  
let temperaturaDescripcion = document.getElementById('temperatura-descripcion')  
let ubicacion = document.getElementById('ubicacion')  
let iconoAnimado = document.getElementById('icono-animado') 
let vientoVelocidad = document.getElementById('viento-velocidad') 

//evento que llamara a la api
window.addEventListener('load', ()=> {
    if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition( posicion => {
           //console.log(posicion.coords.latitude)
           lon = posicion.coords.longitude
           lat = posicion.coords.latitude
            //ubicación actual    
           let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=es&units=metric`
           console.log(url)
        
            apiClima(url)
       })   
    }
})
//funcion que llama a la API
function apiClima(url){
    fetch(url)
    .then( response => { return response.json()})
    .then( data => {
        temperatura(data)
        animacionClima(data)
              
    })
    .catch( error => {
        console.log(error)
    })
}
//funcion que genera los valores para el DOM
function temperatura(data){
    let temp = Math.round(data.main.temp)
    let desc = data.weather[0].description
    temperaturaValor.textContent = `${temp} ° C`
    temperaturaDescripcion.textContent = desc.toUpperCase()
    ubicacion.textContent = data.name           
    vientoVelocidad.textContent = `${data.wind.speed} m/s`   
}
//funcion para el icono animado del DOM
function animacionClima(data){
    switch (data.weather[0].main) {
        case 'Thunderstorm':
            iconoAnimado.src='./assets/animated/thunder.svg'  
        break;
        case 'Drizzle':
            iconoAnimado.src='./assets/animated/rainy-2.svg'  
        break;
        case 'Rain':
            iconoAnimado.src='./assets/animated/rainy-7.svg'  
        break;
        case 'Snow':
            iconoAnimado.src='animated/snowy-6.svg'   
        break;                        
        case 'Clear':
            iconoAnimado.src='./assets/animated/day.svg'    
        break;
        case 'Atmosphere':
            iconoAnimado.src='./assets/animated/weather.svg'   
        break;  
        case 'Clouds':
            iconoAnimado.src='./assets/animated/cloudy-day-1.svg'  
        break;  
        default:
            iconoAnimado.src='./assets/animated/cloudy-day-1.svg'    
    }
}