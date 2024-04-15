<template>
<div class="sm:min-w-30">
    <div class="h-screen bg-slate-800 ">
        <button class="text-white bg-red-600 rounded-md m-5 p-0.5" @click="logout">Logout</button>
        <div class="h-screen w-96 bg-slate-900 float-right">
            <h1 class="text-white text-xl text-center pt-5 font-bold  font-serif">Dashboard {{ props.user }}</h1>
            <div class="grid grid-rows-3">
                <div class="bg-white h-52 w-52 m-auto mt-10 rounded-md" >
                    <button @click="console.log('click en btn1')"  class="h-full w-full bg-slate-950 rounded-md text-white">Cambio</button>
                </div>
                <div class="bg-white h-52 w-52 m-auto mt-10 rounded-md">
                    <button @click="console.log('click en btn2')"  class="h-full w-full bg-slate-950 rounded-md text-white">Cambio</button>
                </div>
                <div class="bg-white h-52 w-52 m-auto mt-10 rounded-md">
                    <button @click="console.log('click en btn3')" class="h-full w-full bg-slate-950 rounded-md text-white">Cambio</button>
                </div>
            </div>
        </div>
        <Listado></Listado>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Listado from '../components/Listado.vue'
import { useRouter } from 'vue-router';
const props = defineProps({
    user: String,
})
const router = useRouter()
const datos = ref([])
const logout = ()=>{
    router.push({name: 'Login'});
    sessionStorage.clear;
    console.log('Sesion cerrada')
}
//Obtengo los datos desde sessionStorage
const obtener = async()=>{
    datos.value = JSON.parse(sessionStorage.getItem('sesion'))
    console.log(datos.value)
}
onMounted(()=>{
    obtener()
})
</script>

<style scoped>

</style>