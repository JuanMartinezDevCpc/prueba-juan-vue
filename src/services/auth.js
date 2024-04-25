import axios from 'axios';

export function login(payload){
	return axios.post(`/login`, payload)
}

export function getCargos(payload){
	return axios.get(`/cargos`, payload)
}

export function postCargo(payload) {
	return axios.post(`/cargo`, payload)
}

export function postDepartamento(payload) {
	return axios.post(`/departamento`, payload)
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
export function editCargo(payload, id) {
	return axios.put(`/cargo/${id}/editar`, payload)
}
export function deleteCargo(id) {
	return axios.delete(`/cargos/${id}/eliminar`)
}
export function editDepartamento(payload, id) {
	return axios.put(`/departamento/${id}/editar`, payload)
}
export function deleteDepartamento(id) {
	return axios.delete(`/departamento/${id}/eliminar`)
}