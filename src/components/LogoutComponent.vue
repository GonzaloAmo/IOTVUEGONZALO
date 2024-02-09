<template>
    <div class="float-right">
        <button @click="CerrarSesion" type="button" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            Cerrar Sesión
        </button>
    </div>
</template>

<script setup>
import { signOutUser } from '@/firebase.js';
import router from '@/router';
const CerrarSesion=()=>{
    signOutUser();
    router.push('/');
}
</script>

<style lang="css">
    @import '@/assets/styles/main.css';
</style>