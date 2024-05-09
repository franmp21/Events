<template>
    <div class="h-max bg-green-500 p-5 m-5">
        <h1 class="font-bold text-xl">{{ props.evento.titulo }} </h1>
        <button class="border rounded-md bg-green-800 px-5 py-2 m-3" @click="mostrar = !mostrar" >Detalles</button>
        <div v-show="mostrar">
            <h1>Creado por: {{ props.evento.creador_id }}</h1>
            <h2>{{ props.evento.descripcion }}</h2>
            <h3>Fecha inicio:{{ props.evento.fecha }}</h3>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
    evento: Object
})
const mostrar = ref(false);
</script>

<style  scoped>

</style>