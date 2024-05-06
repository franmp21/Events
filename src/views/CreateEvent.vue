<template>

        <div class="flex-grow flex flex-col">
            
            <div class="flex-grow-0 h-4/5">
                <h1 class="text-3xl font-bold text-center p-4 text-green-900">Nuevo Evento</h1>
                <form class="h-1/3 m-10" >
                    <div class="flex-grow-0 h-1/4 ">
                        <input class="bg-green-600 text-white text-center rounded-md w-full h-10" type="text" v-model="titulo" placeholder="TÍTULO">
                    </div>
                    <div class="mt-2 flex justify-center h-1/4 ">
                        <textarea class="bg-green-600 text-white text-center rounded-md w-full h-30" type="text" v-model="descripcion" placeholder="DESCRIPCIÓN"/>
                    </div>
                    <div class="mt-2 flex justify-center h-1/5 ">
                        <input class="bg-green-600 text-white text-center rounded-md w-full h-10" type="text" v-model="ubicacion" placeholder="UBICACIÓN">
                    </div>  
                    <div class="mt-2 flex justify-center h-1/5">
                        <input type="date" class="bg-green-600 text-white text-center rounded-md w-full h-10" v-model="fecha">
                    </div>     
                </form>
                <div class="h-1/3">
                    <h2 class="text-red-500 text-3xl text-center font-bold font-mono">{{ mensaje }}</h2>
                    <h1 class="mt-10 text-2xl font-bold font-sans text-center text-green-600">Filtros</h1>
                        <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 overflow-y-scroll h-96" >
                            <div v-if="datosCargados" v-for="filtro in filtrosCargados" :key="filtro.id">
                                <div @click="seleccion(filtro.tipo)" class="m-10 p-6 border rounded-md grid grid-cols-2" :class="{'bg-green-400': filtro.activo, 'bg-gray-400': !filtro.activo}">
                                    <img class="w-10 h-auto" :src="filtro.link">
                                    <h1 class="text-center mr-5 overflow-x-hidden">{{ filtro.tipo }}</h1>
                                </div>
                            </div> 
                            <div v-else>
                                <h1>Cargando..</h1>
                            </div>
                 
                        </div> 
                </div>
                <div class="h-full">
                    
                </div>
            </div>
            <div class="flex-grow-0 h-1/5 flex-row mt-10">
                <button @click="crear" class=" text-white ml-2  bg-blue-800  md:w-48 sm:w-48 h-12 float-left rounded-lg">Crear</button>
                <button @click="resetear"  class="text-white bg-blue-950 float-right md:w-48 sm:w-24 h-12 mr-2 rounded-lg">Borrar todo</button>
            </div>



        </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { añadirDatos, actualizarDatos } from '@/stores/firebase';
import { obtenerFiltros } from '@/stores/firebase';
const titulo = ref('')
const descripcion = ref('')
const ubicacion = ref('')
const filtrosCargados = ref([])
const filtrosSeleccionados = ref([])
const datosCargados = ref(false)
const mensaje = ref('')
const fecha = ref('')
const añadir = (id)=>{
    if (filtrosSeleccionados.value.includes(id)) {
        filtrosSeleccionados.value = filtrosSeleccionados.value.filter(el => el !== id);
    } else {
        filtrosSeleccionados.value.push(id);
    }
    
    
}
const crear = async()=>{

    let myId = JSON.parse(sessionStorage.getItem('sesion'))[0]
    let fechaNueva = new Date(fecha.value)
    let anho = fechaNueva.getFullYear()
    let mes = fechaNueva.getMonth()+1
    let dia = fechaNueva.getDate()
    let fechaCadena = `${dia}/${mes}/${anho}`
    let newEvent = {
        title: titulo.value,
        location: ubicacion.value,
        description: descripcion.value,
        date: fechaCadena,
        filters: filtrosSeleccionados.value,
        signed_users: [myId],
        publisher: myId
        

    }
    let refDoc = await añadirDatos('eventos', newEvent)
    console.log("Document written with ID: ", refDoc.id);
    let miUsuario = JSON.parse(sessionStorage.getItem('sesion'))[1]
    miUsuario.my_events = [...miUsuario.my_events, refDoc.id]
    await actualizarDatos('users', myId, miUsuario)
    mensaje.value='Evento creado con éxito'
    resetear()
    setTimeout(()=>{
        mensaje.value=""
    }, 2000)
    

}
const resetear = ()=>{
    titulo.value=""
    descripcion.value=""
    ubicacion.value=""
    fecha.value = undefined;
    filtrosCargados.value.map(el => el.activo = false)
}
const obtener = async()=>{
    let filtros = await obtenerFiltros()
    return filtros
}
onMounted(async()=>{
    filtrosCargados.value = await obtener()
    filtrosCargados.value  = filtrosCargados.value.map((el) => {
        let filtro = {
            ...el,
             activo: false,
            }
        return filtro;

    })
    datosCargados.value=true
    
        
})


//Controlador para los filtros

const seleccion = (elemento)=>{

    let elementoSeleccionado = filtrosCargados.value.find(el => el.tipo === elemento);
    if (!elementoSeleccionado) {
        console.error('Elemento no encontrado');
        return;
    }
    elementoSeleccionado.activo = !elementoSeleccionado.activo
    añadir(elementoSeleccionado.id)

}
</script>

<style scoped>

</style>