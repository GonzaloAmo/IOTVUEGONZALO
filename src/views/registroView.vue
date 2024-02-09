<template>
  <div v-if="loginErrorMessage"
    class="error-message bg-red-100 p-4 border border-red-300 rounded-md text-red-500 text-center mt-4 text-sm">
    {{ loginErrorMessage }}
  </div>
  <div class="container mx-auto mt-10">

    <div v-if="loginFormVisible" class="max-w-md mx-auto bg-white p-8 border rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold text-center mb-6">Iniciar Sesión</h2>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-600">Correo Electrónico:</label>
          <input v-model="email" type="email" id="email" name="email" class="mt-1 p-2 w-full border rounded-md">
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-600">Contraseña:</label>
          <input v-model="password" type="password" id="password" name="password"
            class="mt-1 p-2 w-full border rounded-md">
        </div>

        <div class="mb-4">
          <button type="submit" id="loginButton"
            class="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200">
            Iniciar Sesión
          </button>
        </div>

        <div class="text-center">
          <button type="button" class="text-blue-500 hover:underline focus:outline-none"
            @click="showRegisterForm">Registrarse</button>
        </div>
      </form>
    </div>
    <div v-else class="max-w-md mx-auto bg-white p-8 border rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold text-center mb-6">Registro</h2>

      <form @submit.prevent="handleSignup">
        <!-- ... Campos de registro ... -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-600">Nombre:</label>
          <input v-model="name" type="text" id="name" name="name" class="mt-1 p-2 w-full border rounded-md">
        </div>

        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-600">Correo Electrónico:</label>
          <input v-model="email" type="email" id="email" name="email" class="mt-1 p-2 w-full border rounded-md">
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-600">Contraseña:</label>
          <input v-model="password" type="password" id="password" name="password"
            class="mt-1 p-2 w-full border rounded-md">
        </div>
        <div class="mb-4">
          <button type="submit" id="signupButton"
            class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200">
            Registrarse
          </button>
        </div>

        <div class="text-center">
          <button type="button" class="text-blue-500 hover:underline focus:outline-none" @click="showLoginForm">Volver a
            Inicio de Sesión</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import router from '@/router';
import { signInUserCredentials, createUserCredentials,saveDataWithId } from '@/firebase';
import { ref } from 'vue';
const email = ref('');
const password = ref('');
const name = ref('');
const loginErrorMessage = ref('');

const loginFormVisible = ref(true);

const showRegisterForm = () => {
  loginFormVisible.value = false;
};

const showLoginForm = () => {
  loginFormVisible.value = true;
};

const handleLogin = async (e) => {
  e.preventDefault();
  //CONSOLE LOG DE LOS DATOS DEL USUARIO
  console.log('Correo Electrónico:', email.value);
  console.log('Contraseña:', password.value);
  try {
    await signInUserCredentials(email.value, password.value);
    console.log("Inicio de sesión exitoso");
    // IR CON ROUTER A LA PÁGINA DE INICIO
    router.push('/inicio');
    loginErrorMessage.value="";
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    loginErrorMessage.value = "Credenciales incorrectas. Por favor, inténtelo de nuevo.";
    email.value = '';
    password.value = '';
  }
};
const handleSignup = async (e) => {
  e.preventDefault();
  //CONSOLE LOG DE LOS DATOS DEL USUARIO
  console.log('Correo Electrónico:', email.value);
  console.log('Contraseña:', password.value);
  console.log('Nombre:', name.value);
  try {
    const userCredential= await createUserCredentials(email.value, password.value, name.value);
    console.log("Registro exitoso");
    // CREAR DOCUMENTO EN LA COLECCIÓN DE SPACIOSç
    const user = userCredential.user;
    const userId = user.uid;
    await saveDataWithId('espacios', userId, {});

    loginErrorMessage.value="";
  } catch (error) {
    console.error("Error al registrarse:", error.message);
    loginErrorMessage.value = "Error al registrarse. Por favor, inténtelo de nuevo.";
    email.value = '';
    password.value = '';
    name.value = '';
  }
};
</script>

<style lang="css">
@import '@/assets/styles/main.css';

body {
  background-color: #f2f2f2;
}

#loginErrorMessage,
#signupErrorMessage {
  color: red;
  text-align: center;
  margin-top: 10px;
  /* Ajusta el margen superior según sea necesario */
  font-size: 14px;
  /* Ajusta el tamaño de fuente según sea necesario */
}</style>
