import { API_URL } from "../data";
import axios from 'axios';

const API_USER = `${API_URL}/user`

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_USER}`);
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
        const response = await axios.post(`${API_USER}`, userData);
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

export const editUser = async (userId: number, userData: any) => {
    try {
        const response = await axios.put(`${API_USER}/${userId}`, userData);
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
                message: "message" in error ? error.message : "Error al editar usuario",
            },
        };
    }
};

export const deleteUser = async (userId: number) => {
    try {
        const response = await axios.delete(`${API_USER}/${userId}`);
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
