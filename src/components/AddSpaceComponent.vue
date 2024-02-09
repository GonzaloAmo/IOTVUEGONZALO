<template>
  <div>
    <div class="flex items-center justify-center">
      <button @click="openAddSpaceModal"
        class="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-12 rounded w-4/5">
        Añadir Espacio +
      </button>

      <!-- Modal para añadir espacio -->
      <div v-if="isAddSpaceModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-8 max-w-md w-full rounded">
          <h2 class="text-2xl font-bold mb-4">Añadir Espacio</h2>

          <!-- Formulario para añadir espacio -->
          <form @submit.prevent="saveSpace">
            <div class="mb-4">
              <label for="spaceName" class="block text-sm font-medium text-gray-600">Nombre del Espacio:</label>
              <input v-model="newSpaceName" type="text" id="spaceName" name="spaceName"
                class="mt-1 p-2 w-full border rounded-md">
            </div>

            <div class="mt-4">
              <button type="submit" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                Añadir Espacio
              </button>
              <button @click="closeAddSpaceModal" type="button"
                class="ml-2 text-blue-500 hover:underline focus:outline-none">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <ul>
      <li v-for="(space, index) in spaces" :key="space.id">

        <div class="mx-3 bg-green-200 p-4 my-2 rounded">
          <span class="text-2xl font-semibold">{{ space.Nombres }}</span>
          <button @click="toggleMenu(index)" class="text-2xl p-4 focus:outline-none">
            <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
          <button @click="eliminarSpace(space.id)"
            class=" focus:outline-none p-2 bg-red-500 hover:bg-red-600 text-white rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3"
              viewBox="0 0 16 16">
              <path
                d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
            </svg>
          </button>
          <div v-if="openMenus[index]">
      <li v-for="(device) in getDevicesAndSensors(space.id)" :key="device.id"
        class="list-group-item d-flex justify-content-between align-items-center">
        <div v-if="device.device === 'sensor'">
          <span class="text-lg font-semibold inline-block bg-green-800  text-white px-2 py-1 rounded">{{ device.name }}:
            {{
              device.type }}</span>
          <button @click="eliminarDevice(device.id)"
            class="focus:outline-none p-2 bg-red-500 hover:bg-red-600 text-white rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3"
              viewBox="0 0 16 16">
              <path
                d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
            </svg>
          </button>
          <button @click="toApp(device.id)"
            class="focus:outline-none p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square"
              viewBox="0 0 16 16">
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
            </svg>
          </button>
        </div>
        <div v-else>
          <span class="text-lg font-semibold inline-block bg-green-800 text-white px-2 py-1 rounded">{{ device.name }}: {{
            device.status }}</span>
          <button @click="eliminarDevice(device.id)"
            class="focus:outline-none p-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3"
              viewBox="0 0 16 16">
              <path
                d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
            </svg>
          </button>
          <button @click="toApp(device.id)"
            class="focus:outline-none p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square"
              viewBox="0 0 16 16">
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
            </svg>
          </button>
        </div>
      </li>

      <button @click="openSensorModal"
        class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded m-2 text-sm">
        Añadir Sensor
      </button>
      <div v-if="showSensorModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-8 max-w-md w-full rounded">
          <h3 class="text-lg font-bold mb-4">Añadir Sensor</h3>
          <form @submit.prevent="submitSensorForm(space.id)">
            <label for="sensorName" class="block text-sm font-medium text-gray-700">Nombre del Sensor</label>
            <input v-model="sensorName" type="text" id="sensorName" name="sensorName"
              class="mt-1 p-2 w-full border rounded">

            <label for="sensorType" class="block text-sm font-medium text-gray-700 mt-4">Tipo de Sensor</label>
            <select v-model="sensorType" id="sensorType" name="sensorType" class="mt-1 p-2 w-full border rounded">
              <option value="temperatura">Temperatura</option>
              <option value="humedad">Humedad</option>
              <option value="presion">Presión</option>
              <option value="luminosidad">Luminosidad</option>
              <option value="movimiento">Movimiento</option>
              <option value="sonido">Sonido</option>
            </select>
            <button @click="openEjecutorModal" type="submit"
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4">
              Añadir Sensor
            </button>
            <button @click="closeSensorModalAndClearInputs"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4">
              Cerrar
            </button>
          </form>
        </div>
      </div>
      <button @click="openEjecutorModal"
        class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded m-2 text-sm">
        Añadir Ejecutor
      </button>
      <div v-if="showEjecutorModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-8 max-w-md w-full rounded">
          <h3 class="text-lg font-bold mb-4">Añadir Ejecutor</h3>
          <form @submit.prevent="submitEjecutorForm(space.id)">
            <label for="ejecutorName" class="block text-sm font-medium text-gray-700">Nombre del Ejecutor</label>
            <input v-model="ejecutorName" type="text" id="ejecutorName" name="ejecutorName"
              class="mt-1 p-2 w-full border rounded">

            <div class="mt-4">
              <input v-model="ejecutorStatus" type="checkbox" id="ejecutorStatus" name="ejecutorStatus" class="mr-2">
              <label for="ejecutorStatus" class="text-sm font-medium text-gray-700">Activo</label>
            </div>

            <button type="submit" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4">
              Añadir Ejecutor
            </button>
            <button @click="closeEjecutorModalAndClearInputs"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4">
              Cerrar
            </button>
          </form>
        </div>
      </div>
  </div>
  </div>
  </li>
  </ul>


  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { getSubCollection, auth, saveSubCollection, deleteSubCollection } from '@/firebase.js';

const spaces = ref([]);
let userUID = ref(null);
let openMenus = ref([]);
const isAddSpaceModalOpen = ref(false);
const newSpaceName = ref('');
const devicesAndSensors = reactive([])
const showSensorModal = ref(false);
const sensorName = ref('');
const sensorType = ref('');
const showEjecutorModal = ref(false);
const ejecutorName = ref('');
const ejecutorStatus = ref(false);


const closeSensorModalAndClearInputs = () => {
  closeSensorModal();
  clearSensorInputs();
};
const closeEjecutorModalAndClearInputs = () => {
  closeEjecutorModal();
  clearEjecutorInputs();
};

const clearSensorInputs = () => {
  sensorName.value = '';
  sensorType.value = '';
};

const clearEjecutorInputs = () => {
  ejecutorName.value = '';
  ejecutorStatus.value = false;
};

const openSensorModal = () => {
  showSensorModal.value = true;
};

const closeSensorModal = () => {
  showSensorModal.value = false;
};


const openEjecutorModal = () => {
  showEjecutorModal.value = true;
};

const closeEjecutorModal = () => {
  showEjecutorModal.value = false;
};
const getDevicesAndSensors = (id) => devicesAndSensors.filter(device => device.idSpace === id)

auth.onAuthStateChanged(async (user) => {
  if (user) {
    userUID.value = user.uid;
    try {
      await getSubCollection('espacios', userUID.value, 'Names', (snapshot) => {
        spaces.value.splice(0, spaces.length);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        spaces.value = data;
        openMenus.value = Array(data.length).fill(false);
      });
      await getSubCollection('espacios', userUID.value, 'Devices', (snapshot) => {
        devicesAndSensors.splice(0, devicesAndSensors.length);
        snapshot.docs.map(doc => devicesAndSensors.push({ id: doc.id, ...doc.data() }));
      });
    } catch (error) {
      console.error('Error al obtener espacios:', error);
    }

  } else {
    userUID.value = null;
  }
});

const toApp = (idDevice) => {
  window.open(`https://gonzaloamo.github.io/IOT2${userUID.value}/${idDevice}`, '_blank');
}
const toggleMenu = (index) => {
  openMenus.value[index] = !openMenus.value[index];
};

const openAddSpaceModal = () => {
  isAddSpaceModalOpen.value = true;
};

const closeAddSpaceModal = () => {
  isAddSpaceModalOpen.value = false;
  newSpaceName.value = '';
};

const saveSpace = async () => {
  try {
    await saveSubCollection('espacios', userUID.value, 'Names', { Nombres: newSpaceName.value });
    closeAddSpaceModal();
  } catch (error) {
    throw new Error(error);
  }
};

const submitSensorForm = (idSpace) => {
  const saveSpace = async () => {
    try {
      await saveSubCollection('espacios', userUID.value, 'Devices', { name: sensorName.value, type: sensorType.value, device: 'sensor', idSpace: idSpace });
    } catch (error) {
      throw new Error(error);
    }
  };
  saveSpace();
  closeSensorModalAndClearInputs();
};

const submitEjecutorForm = (idSpace) => {
  const saveEjecutor = async () => {
    try {
      await saveSubCollection('espacios', userUID.value, 'Devices', { name: ejecutorName.value, status: ejecutorStatus.value ? 'activo' : 'inactivo', device: 'ejecutor', idSpace: idSpace });
    } catch (error) {
      throw new Error(error);
    }
  };
  saveEjecutor();
  closeEjecutorModalAndClearInputs();
};
const eliminarDevice = async (id) => {
  await deleteSubCollection('espacios', userUID.value, 'Devices', id);
}
const eliminarSpace = async (id) => {
  await deleteSubCollection('espacios', userUID.value, 'Names', id);
  getDevicesAndSensors(id).forEach(async (device) => {
    await deleteSubCollection('espacios', userUID.value, 'Devices', device.id);
  });
}


</script>

<style lang="css"></style>
