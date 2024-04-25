<template>
    <div class="container mt-5">
        <h1>Listado de Usuarios</h1>
        <table class="table mt-3">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Correo Electrónico</th>
                    <th>Rol</th>
                    <th>Telefono</th>
                    <th>cargo</th>
                    <th>departamento</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="user.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <!-- <td>{{ user.nombre }}</td> -->
                    <td>
                        <input v-model="user.nombre" type="nombre" class="form-control" placeholder="Ingrese su nombre">
                    </td>
                    <td>
                        <input v-model="user.email" type="email" class="form-control" placeholder="Ingrese su email">
                    </td>
                    <!-- <td>{{ user.email }}</td> -->
                    <td>{{ tipos[user.tipo] }}</td>
                    <td>
                        <input v-model="user.telefono" type="telefono" class="form-control"
                            placeholder="Ingrese su telefono">
                    </td>
                    <td v-show="user.tipo == 1">
                        <select v-model="user.cargo" class="form-control">
                            <option v-for="(i, index) in cargos" :key="index" :value="i.id">{{ i.nombre }}
                            </option>
                        </select>
                    </td>
                    <td v-show="user.tipo == 1">
                        <select v-model="user.departamento" class="form-control">
                            <option v-for="(i, index) in departamentos" :key="index" :value="i.id">{{ i.nombre
                                }}</option>
                        </select>
                    </td>
                    <td>
                        <button @click="editUser(user)">Editar</button>
                        <button class="mt-1" @click="deleteUser(user.id)">Eliminar</button>

                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as Service from '../services/auth'

onMounted(() => {
    getDepartamentos();
    getCargos();
    getUsers();
})

const users = ref([])
const cargos = ref([])
const departamentos = ref([])

const tipos = {
    1: 'Empleado',
    2: 'Usuario'
}

async function getUsers() {
    const { data } = await Service.getUsers()
    users.value = data.data
}

async function editUser(item) {
    const payload = {
        nombre: item.nombre,
        email: item.email,
        telefono: item.telefono,
        tipo: item.tipo,
        idCargo: item.cargo,
        idDepartamento: item.departamento
    }
    await Service.editUser(payload, item.id)
}

async function deleteUser(id) {
    const {data} = await Service.deleteUser(id)
    if(data.data) {
        const idx= users.value.find((e) => e.id == id)
        users.value.splice(idx, 1)
    }
}

async function getCargos() {
    try {
        const { data } = await Service.getCargos()
        cargos.value = data.data
    } catch (error) {
        console.log(error);
    }
}
async function getDepartamentos() {
    const { data } = await Service.getDepartamentos()
    departamentos.value = data.data
}

</script>