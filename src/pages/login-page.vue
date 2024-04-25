<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        Iniciar sesión
                    </div>
                    <div v-if="!register" class="card-body">
                        <div class="card-body">
                            <div class="form-group">
                                <label for="email">Correo electrónico:</label>
                                <input v-model="correo" type="email" class="form-control"
                                    placeholder="Ingrese su correo electrónico">
                            </div>
                            <div class="form-group">
                                <label for="password">Contraseña:</label>
                                <input v-model="contrasena" type="password" class="form-control"
                                    placeholder="Ingrese su contraseña">
                            </div>
                        </div>
                    </div>
                    <div v-else class="card-body">
                        <div class="card-body">
                            <div class="form-group">
                                <label for="email">nombre</label>
                                <input v-model="nombre" type="nombre" class="form-control"
                                    placeholder="Ingrese su nombre">
                            </div>
                            <div class="form-group">
                                <label for="telefono">telefono</label>
                                <input v-model="telefono" type="telefono" class="form-control"
                                    placeholder="Ingrese su telefono">
                            </div>
                            <div class="form-group">
                                <label for="email">Correo electrónico:</label>
                                <input v-model="correo" type="email" class="form-control"
                                    placeholder="Ingrese su correo electrónico">
                            </div>
                            <div class="form-group">
                                <label for="password">Contraseña:</label>
                                <input v-model="contrasena" type="password" class="form-control"
                                    placeholder="Ingrese su contraseña">
                            </div>
                            <div class="form-group">
                                <label>Tipo:</label>
                                <div>
                                    <label><input type="radio" v-model="tipo" :value=1> Empleado</label>
                                    <label><input type="radio" v-model="tipo" :value=2> Usuario</label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>cargo:</label>
                                <select v-model="cargo" class="form-control">
                                    <option v-for="(i, index) in cargos" :key="index" :value="i.id">{{ i.nombre }}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>departamento:</label>
                                <select v-model="departamento" class="form-control">
                                    <option v-for="(i, index) in departamentos" :key="index" :value="i.id">{{ i.nombre
                                        }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div v-if="!register" class="card-footer">
                        <button class="btn btn-primary btn-block" @click="attemplogin">Iniciar sesión</button>
                    </div>
                    <div v-else class="card-footer">
                        <button class="btn btn-primary btn-block" @click="registerUser">registrar</button>
                    </div>
                </div>
                <button class="btn btn-primary btn-block mt-2" @click="registerForm">registrar usuario</button>
            </div>
        </div>
    </div>
    <div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import * as Service from '../services/auth'
import { useAuth } from '../store/auth.store';
import { useRouter } from 'vue-router';

const correo = ref('')
const nombre = ref('')
const telefono = ref('')
const cargo = ref(null)
const departamento = ref(null)
const contrasena = ref('');
const register = ref(false);
const { login } = useAuth();
const router = useRouter();
const tipo = ref(1)
const cargos = ref([]);
const departamentos = ref([])

async function attemplogin() {
    try {
        const payload = {
            email: correo.value,
            password: contrasena.value
        }
        const { data } = await Service.login(payload);
        if (data.data.access_token) {
            await login(data?.data.access_token)
            router.push({ name: 'users' })
        }
    } catch (error) {
        console.log(error);
    }
}
async function registerUser() {
    try {
        const payload = {
            email: correo.value,
            password: contrasena.value,
            nombre: nombre.value,
            idDepartamento: departamento.value,
            idCargo: cargo.value,
            tipo: tipo.value,
            telefono: telefono.value
        }
        await Service.registerUser(payload);
        register.value = false;
        correo.value = ''
        contrasena.value = ''
    } catch (error) {
        console.log(error);
    }
}

async function registerForm() {
    await getCargos()
    await getDepartamentos()
    register.value = true
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
<style scoped>
.container {
    max-width: 500px;
}

.card {
    border: 1px solid #eaeaea;
    border-radius: 5px;
}

.card-header {
    background-color: #f8f9fa;
    border-bottom: 1px solid #eaeaea;
}

.card-footer {
    background-color: #f8f9fa;
}
</style>