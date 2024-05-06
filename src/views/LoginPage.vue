<template>
        <div v-if="switchOption" class="fixed h-screen w-full bg-black flex flex-col items-center justify-center "> 
            <h1 class="text-center text-3xl font-bold font-serif text-blue-700 mb-10">Log in</h1>
            <form class="w-80" @submit.prevent="logear()">
                <div class="flex justify-center">
                    <input class="bg-blue-600 text-white text-center rounded-md" type="text" v-model="email" placeholder="email">
                </div>
                <div class="mt-2 flex justify-center">
                    <input class="bg-blue-600 text-white text-center  rounded-md" type="password" v-model="password" placeholder="password">
                </div>
                <div class="mt-5 flex justify-center">
                    <button type="submit" class=" text-white m-2 bg-blue-800 rounded-md">Submit</button>
                    <button type="button" @click="switchOption = !switchOption" class="text-white m-2 bg-blue-800 rounded md ">Registrate</button>
                </div>    
            </form>
            <span class="text-red-700 text-center font-bold font-serif">{{ errorMsj }}</span>
        </div>
        <div v-else class="fixed h-screen w-full bg-black flex flex-col items-center justify-center "> 
            <h1 class="text-center text-3xl font-bold font-serif text-blue-700 mb-10">Registro</h1>
            <form class="w-80" @submit.prevent="registrar()">
                <div class="flex justify-center">
                    <input class="bg-blue-600 text-white text-center rounded-md" type="text" v-model="email" placeholder="email">
                </div>
                <div class="mt-2 flex justify-center">
                    <input class="bg-blue-600 text-white text-center rounded-md" type="text" v-model="username" placeholder="username">
                </div>
                <div class="mt-2 flex justify-center">
                    <input class="bg-blue-600 text-white text-center  rounded-md" type="password" v-model="password" placeholder="password">
                </div>
                <div class="mt-2 flex justify-center">
                    <input class="bg-blue-600 text-white text-center  rounded-md" type="password" v-model="rep_password" placeholder="repeat password">
                </div>
                <div class="mt-5 flex justify-between">
                    <button type="submit" class=" text-white ml-20 bg-blue-800 rounded-md">Submit</button>
                    <button type="button" @click="switchOption = !switchOption" class="text-white mr-20 bg-blue-800 rounded md ">Logeate</button>
                </div>      
            </form>
            <span class="text-red-700 text-center font-bold font-serif">{{ errorMsj }}</span>   
        </div>
    
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { createAccount, signIn, obtenerDatos, añadirDatos } from '../stores/firebase';
const router = useRouter()

//variables
const switchOption = ref(true)
const email = ref('');
const rep_password = ref('')
const password = ref('')
const errorMsj = ref('')
const username = ref('')

const verificar = ()=> password.value === rep_password.value



const logear = async()=>{
    try{
        await signIn(email.value, password.value)
        let datos = await obtenerDatos('users', email.value)

        let username = datos[1].user
        //Recojo todos los datos en localStorage
        sessionStorage.setItem('sesion', JSON.stringify(datos))
        router.push({
            name: 'SeeEvents',
            params: {
                user: username,
            }
        });

    }catch(err){
        errorMsj.value = 'Datos incorrectos.'
    }
    
}

const registrar = async()=>{
    //Si la contraseña es demasiado corta, no se podrá registrar (normas de firebase auth)  
    if(verificar() && password.value.length >=8){
        console.log()
        await createAccount(email.value, password.value, username.value);
        let documento = {
            email: email.value,
            password: password.value,
            user: username.value,
            favourites_events: [],
            my_events: [],
            profile_img: '',
            description: ''
        }
        let refDoc = await añadirDatos('users', documento)
        console.log("Document written with ID: ", refDoc.id);
        let datos = [refDoc.id, documento]
        sessionStorage.setItem('sesion', JSON.stringify(datos))
        router.push({
            name: 'Main',
            params: {
                user: username.value,
            }
        })
       
        
    }
    else{
        errorMsj.value = 'contraseñas incorrectas'
        setTimeout(()=>{
            errorMsj.value=""
        }, 2000)
        
    }


}


</script>

<style scoped>

</style>