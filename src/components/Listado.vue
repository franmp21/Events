<script setup>
import { usePokemonsStore } from '../stores/pokemons'
const pStore = usePokemonsStore()

</script>
<template>
  
    <ul class="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:min-w-10gap-4 justify-items-center">
      <li class="" v-for="pokemon in pStore.pokemons">
        <div v-if="pokemon.type==='plant'">
          <div class="m-5 rounded-xl  border-green-500 border-4 p-4 bg-slate-50 w-56 h-72 ">
            <h1 class="mx-auto text-green-500 text-5xl font-bold text-center">{{ pokemon.id }}</h1>
            <h1 class="mx-auto text-green-600 text-3xl font-bold text-center m-5 ">{{ pokemon.nombre }}</h1>
            <img class="mx-auto border border-green-800 rounded-full w-32 " :src="pokemon.img" alt="Imagen de {{ pokemon.nombre }}">
          </div>
        </div>
        <div v-else-if="pokemon.type==='fire'">
          <div class="m-5 rounded-xl  border-orange-700 border-4 p-4 bg-slate-50 w-56 h-72 ">
            <h1 class="mx-auto text-orange-500 text-5xl font-bold text-center">{{ pokemon.id }}</h1>
            <h1 class="mx-auto text-orange-600 text-3xl font-bold text-center m-5 ">{{ pokemon.nombre }}</h1>
            <img class="mx-auto border border-orange-800 rounded-full w-32 " :src="pokemon.img" alt="Imagen de {{ pokemon.nombre }}">
          </div>
        </div>
        <div v-else-if="pokemon.type==='water'">
          <div class="m-5 rounded-xl  border-blue-700 border-4 p-4 bg-slate-50 w-56 h-72 ">
            <h1 class="mx-auto text-cyan-500 text-5xl font-bold text-center">{{ pokemon.id }}</h1>
            <h1 class="mx-auto text-cyan-600 text-3xl font-bold text-center m-5 ">{{ pokemon.nombre }}</h1>
            <img class="mx-auto border border-blue-800 rounded-full w-32 " :src="pokemon.img" alt="Imagen de {{ pokemon.nombre }}">
          </div>
        </div>    
      </li>
    </ul>




</template>
<style scoped>

</style>