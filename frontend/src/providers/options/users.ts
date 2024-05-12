import { API_URL } from "../data";
import axios from 'axios';

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/user`);
        const data = response.data;
        return {
            success: true,
            users: data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al obtener usuarios",
            },
        };
    }
};


export const addUser = async (userData:any) => {
    try {
        const response = await axios.post(`${API_URL}/user`, userData);
        const data = response.data;
        return {
            success: true,
            user: data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al añadir usuario",
            },
        };
    }
};


export const deleteUser = async (userId: number) => {
    try {
        const response = await axios.delete(`${API_URL}/user/${userId}`);
        const data = response.data;
        return {
            success: true,
            message: data.message,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al eliminar usuario",
            },
        };
    }
};
