<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Empresa</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" @click="goRoute('users')">Usuarios</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="goRoute('cargos')">Cargos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="goRoute('departamentos')">Departamentos</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';


const router = useRouter()

function goRoute(routeName) {
    router.push({name: routeName})
}


</script>