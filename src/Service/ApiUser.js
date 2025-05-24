import axios from "axios";

const apiUrl = 'http://localhost:5000/users'

export async function getAllUsers() {
    return await axios.get(`${apiUrl}/getAllUsers`)
}

export async function addUser(dataUser) {
    return await axios.post(`${apiUrl}/addUser`,dataUser)
}

export async function deletUser(userId) {
    return await axios.delete(`${apiUrl}/deleteUser/${userId}`)
}

export async function updateUser(userId,dataUser) {
    return await axios.put(`${apiUrl}/updateUser/${userId}`,dataUser)
}

export async function login(dataUser) {
    return await axios.post(`${apiUrl}/login`,dataUser)
}