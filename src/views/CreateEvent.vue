<template>
    <div>
        <div class="float-left">
            <h1>Mi Formulario</h1>
            <form @submit.prevent="crear" class="w-80">
                <div class="flex justify-center">
                    <input class="bg-blue-600 text-white text-center rounded-md" type="text" v-model="titulo" placeholder="titulo">
                </div>
                <div class="mt-2 flex justify-center">
                    <input class="bg-blue-600 text-white text-center rounded-md" type="text" v-model="descripcion" placeholder="descripcion">
                </div>
                <div class="mt-2 flex justify-center">
                    <input class="bg-blue-600 text-white text-center  rounded-md" type="text" v-model="ubicacion" placeholder="ubicacion">
                </div>
                <div class="mt-5 flex justify-between">
                    <button type="submit" class=" text-white ml-20 bg-blue-800 rounded-md">Crear</button>
                    <button @click="resetear"  class="text-white bg-blue-959">Borrar todo</button>
                </div>    
            </form>
            <h1 class="mt-20 text-3xl font-bold font-sans text-center text-green-800">Filtros</h1>
            <div class="grid grid-cols-4 grid-rows-3">
                <div v-for="filtro in filtrosCargados" :key="filtro.id">
                    <div @click="seleccion(filtro.tipo)" class="m-10 p-4 border rounded-md" :class="{'bg-green-400': filtro.activo, 'bg-gray-400': !filtro.activo}">
                        <img class="w-10 h-auto" :src="getImage(filtro.link)">
                        {{ filtro.tipo }}
                    </div>
                </div>  
            </div>  
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { obtenerFiltros } from '@/stores/firebase';
const titulo = ref('')
const descripcion = ref('')
const ubicacion = ref('')
const filtrosCargados = ref([])
const filtrosSeleccionados = ref([])

const obtener = async()=>{
    filtrosCargados.value = await obtenerFiltros()
    filtrosCargados.value = filtrosCargados.value.map(el => {
        return {...el, activo: false}

    })
}
const añadir = (id)=>{
    if (filtrosSeleccionados.value.includes(id)) {
        filtrosSeleccionados.value = filtrosSeleccionados.value.filter(el => el !== id);
    } else {
        filtrosSeleccionados.value.push(id);
    }
    
    
}
const getImage = (link)=>{
    return import(link)
}
const resetear = ()=>{
    titulo.value=""
    descripcion.value=""
    ubicacion.value=""
}

onMounted(()=>{
    obtener()
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