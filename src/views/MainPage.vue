<template>
<div class="sm:min-w-30">
    <div :class="{'bg-green-200': ImInRoute('/create_event'), 'bg-green-500': ImInRoute('/see_profile'), 'bg-green-800': ImInRoute('/see_events')}" class="h-screen">
        <button class="text-white bg-red-600 rounded-md m-5 p-0.5" @click="logout">Logout</button>
        <div class="h-screen w-96 bg-slate-900 float-right">
            <h1 class="text-white text-xl text-center pt-5 font-bold  font-serif">Dashboard {{ props.user }}</h1>
            <div class="grid grid-rows-3">
                <div class="bg-white h-52 w-52 m-auto mt-10 rounded-md" >
                    <button
                    class="h-full w-full bg-slate-950 rounded-md"
                    :disabled="ImInRoute('/see_events')"
                    :class="{ 'text-white': !ImInRoute('/see_events'),'text-green-800': ImInRoute('/see_events') }"
                    @click="goToRoute({name: 'SeeEvents', params: {user: username} })" >Ver Eventos</button>
                </div>
                <div class="bg-white h-52 w-52 m-auto mt-10 rounded-md">
                    <button
                    class="h-full w-full bg-slate-950 rounded-md"
                    :disabled="ImInRoute('/create_event')"
                    :class="{ 'text-white': !ImInRoute('/create_event'), 'text-green-200': ImInRoute('/create_event') }"
                    @click="goToRoute({name: 'CreateEvent', params: {user: username} })" >Crear Evento</button>
                </div>
                <div class="bg-white h-52 w-52 m-auto mt-10 rounded-md">
                    <button
                    class="h-full w-full bg-slate-950 rounded-md"
                    :disabled="ImInRoute('/see_profile')"
                    :class="{ 'text-white': !ImInRoute('/see_profile'), 'text-green-500': ImInRoute('/see_profile') }"
                    @click="goToRoute({name: 'SeeProfile', params: {user: username} })" >Mi Perfil</button>
                </div>
            </div>
        </div>
        <div class="ml-24 border bg-blue-200 ">
            <RouterView></RouterView>
        </div>
        
    </div>
</div>

</template>

<script setup>

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const props = defineProps({
    user: String,
})

const router = useRouter()

//Devuelve si me encuentro en la ruta actual a la que me lleva el botón.
const ImInRoute= (targetRoute) => {
    return router.currentRoute.value.path.endsWith(targetRoute)
}

//Si el botón no está desactivado, me llevará a la ruta.
const goToRoute = (targetRoute) => {
    if (!ImInRoute(targetRoute)) {
        router.push(targetRoute)
    }
}
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