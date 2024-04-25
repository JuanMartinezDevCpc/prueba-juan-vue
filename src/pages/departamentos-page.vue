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
                        <button @click="postDepartamento()">agregar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <h1>Listado de Departamentos</h1>
        <div class="row">
            <div class="col-md-6" v-for="(departamento, index) in departamentos" :key="index">
                <div class="card mb-2">
                    <div class="card-body">
                        <h5 class="card-title">
                            <input class="form-control mb-2" v-model="departamento.nombre" />
                        </h5>
                        <textarea class="form-control mb-2" v-model="departamento.descripcion" rows="3"
                            placeholder="Descripción del departamento"></textarea>
                        <a @click="editDepartamento(departamento)" class="btn btn-primary mx-1">Editar</a>
                        <a @click="deleteDepartamento(departamento.id)" class="btn btn-danger">Eliminar</a>
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
    getDepartamentos();
})
const nombre = ref('')
const descripcion = ref('')
const departamentos = ref([])

async function getDepartamentos() {
    const { data } = await Service.getDepartamentos();
    departamentos.value = data.data
}

async function postDepartamento() {
    const payload = {
        nombre: nombre.value,
        descripcion: descripcion.value
    }
    await Service.postDepartamento(payload);
    getDepartamentos()
    nombre.value = "";
    descripcion.value = "";
}

async function editDepartamento(item) {
    const payload = {
        nombre: item.nombre,
        descripcion: item.descripcion
    }
    await Service.editDepartamento(payload, item.id)
}

async function deleteDepartamento(id) {
    const {data } = await Service.deleteDepartamento(id)
    if(data.data) {
        const idx = departamentos.value.findIndex((e) => e.id == id)
        departamentos.value.splice(idx, 1)
    }else {
        console.log(data.message)
    }
}

</script>