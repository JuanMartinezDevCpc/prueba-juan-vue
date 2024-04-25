<template>
    <navbarComp />
    <div class="container mt-5">
        <table class="table mt-3">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>descripciòn</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <input v-model="nombre" type="nombre" class="form-control" placeholder="nombre">
                    </td>
                    <td>
                        <input v-model="descripcion" type="descripcion" class="form-control" placeholder="descripcion">
                    </td>
                    <td>
                        <button @click="postCargo()">agregar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <h1>Listado de cargos</h1>
        <div class="row">
            <div class="col-md-6" v-for="(cargo, index) in cargos" :key="index">
                <div class="card mb-2">
                    <div class="card-body">
                        <h5 class="card-title">
                            <input class="form-control mb-2" v-model="cargo.nombre" />
                        </h5>
                        <textarea class="form-control mb-2" v-model="cargo.descripcion" rows="3"
                            placeholder="Descripción del cargo"></textarea>
                        <a @click="editCargo(cargo)" class="btn btn-primary mx-1">Editar</a>
                        <a @click="deleteCargo(cargo.id)" class="btn btn-danger">Eliminar</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import navbarComp from '../components/navbarComp.vue'
import { onMounted, ref } from 'vue';
import * as Service from '../services/auth'

onMounted(() => {
    getCargos();
})
const nombre = ref('')
const descripcion = ref('')
const cargos = ref([])

async function getCargos() {
    const { data } = await Service.getCargos();
    cargos.value = data.data
}

async function postCargo() {
    const payload = {
        nombre: nombre.value,
        descripcion: descripcion.value
    }
    await Service.postCargo(payload);
    getCargos()
    nombre.value = "";
    descripcion.value = "";
}

async function editCargo(item) {
    const payload = {
        nombre: item.nombre,
        descripcion: item.descripcion
    }
    await Service.editCargo(payload, item.id)
}

async function deleteCargo(id) {
    const { data } = await Service.deleteCargo(id)
    if(data.data){
        const idx = cargos.value.findIndex((e) => e.id == id)
        cargos.value.splice(idx, 1)
    }else {
        console.log(data.message)
    }
}

</script>