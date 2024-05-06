<template>
    <div class="h-screen flex flex-col">
        <header>
            <div class="w-full h-24 bg-green-600">

                <button class="text-white bg-red-600 rounded-md m-5 p-0.5 float-left" @click="logout">Logout</button>
                <div class="flex justify-center">
                    <h1 class="text-white text-2xl mt-10  font-bold font-serif">Dashboard {{ props.user }}</h1>
                </div>
                
            </div> 
        </header>
        <main class="flex-grow ">
            <div :class="{'bg-green-900': ImInRoute('/create_event'), 'bg-green-700': ImInRoute('/see_profile'), 'bg-green-950': ImInRoute('/see_events')}" class="h-full">
            
                <div class="h-full  bg-slate-900 float-right w-1/5">
                    
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
                <div class=" bg-green-200 flex-grow w-4/5 h-full">
                        <RouterView></RouterView>
                    </div>

            </div>
        </main>
    </div>



</template>

<script setup>
import { añadirDatos} from '@/stores/firebase'
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
    console.log(datos.value[1])
}
onMounted(()=>{
    obtener()
})
</script>

<style scoped>

</style>