import { API_URL } from "../data";
import axios from 'axios';

const API_BRAND = `${API_URL}/brand`

export const getAllBrands = async () => {
    try {
        const response = await axios.get(`${API_BRAND}`);
        const data = response.data.map((item:any) => ({
            ...item,
            CREATION_DATE: new Date(item.CREATION_DATE).toISOString().split('T')[0]
        }));
        return {
            success: true,
            brands: data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al obtener las marcas.",
            },
        };
    }
};

export const getBrand = async (brandId:number) => {
    try {
        const response = await axios.get(`${API_BRAND}/${brandId}`);
        const data = response.data;
        data.CREATION_DATE = new Date(data.CREATION_DATE).toISOString().split('T')[0]
        return {
            success: true,
            brand: data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al obtener la marca.",
            },
        };
    }
};


export const addBrand = async (name:{}) => {
    try {
        const response = await axios.post(`${API_BRAND}`, name);
        const data = response.data;
        return {
            success: true,
            brand: data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al añadir la marca.",
            },
        };
    }
};

export const editBrand = async (brandId: number, name:{}) => {
    try {
        const response = await axios.put(`${API_BRAND}/${brandId}`, name);
        const data = response.data;
        return {
            success: true,
            brand: data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al editar la marca.",
            },
        };
    }
};

export const deleteBrand = async (brandId: number) => {
    try {
        const response = await axios.delete(`${API_BRAND}/${brandId}`);
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
                message: "message" in error ? error.message : "Error al eliminar la marca.",
            },
        };
    }
};
