import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = "http://localhost:5000"

function createConfig(token) {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
}

async function createUser(user) {
    await axios.post(`${BASE_URL}/sign-up`, user);
}

async function login(data) {
    const token = await axios.post(`${BASE_URL}/`, data);
    return token;
}

async function createPost(body) {
    const promise = await axios.post(`${BASE_URL}/posts`, body);
    return promise;
}

const api = {
    createUser,
    login,
    createPost
};

export default api;
