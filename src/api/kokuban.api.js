import axios from "axios";

export function registrarUsuario(user) {
    return axios.post('http://127.0.0.1:8000/api/users/register/', user)
}

export function loginUsuario(user) {
    return axios.post('http://127.0.0.1:8000/api/users/login/', user)
}

export function getUsers(headers) {
    return axios.get('http://127.0.0.1:8000/api/users/', Headers=headers)
}
