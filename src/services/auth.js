import axios from 'axios';

export function login(payload){
	return axios.post(`/login`, payload)
}

export function getCargos(payload){
	return axios.get(`/cargos`, payload)
}

export function getDepartamentos(payload){
	return axios.get(`/departamentos`, payload)
}

export function getUsers() {
	return axios.get(`/users`)
}

export function registerUser(payload) {
	return axios.post(`/user`, payload)
}

export function editUser(payload, id) {
	return axios.put(`/user/${id}/editar`, payload)
}
export function deleteUser(id) {
	return axios.delete(`/user/${id}/eliminar`)
}