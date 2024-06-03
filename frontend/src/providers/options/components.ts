import axios from 'axios';

import { API_URL } from "../data";

const API_COMPUTER_COMPONENT = `${API_URL}/computer_component`;
const API_CASE_COMPONENT = `${API_URL}/case_component`;

// Funciones para Componente Computador

export const getAllComputerComponents = async () => {
    try {
        const response = await axios.get(API_COMPUTER_COMPONENT);
        return {
            success: true,
            components: response.data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: error.message || "Error al obtener componentes de computador",
            },
        };
    }
};

export const getComputerComponentById = async (id: number) => {
    try {
        const response = await axios.get(`${API_COMPUTER_COMPONENT}/${id}`);
        return {
            success: true,
            component: response.data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            
            success: false,
            error: {
                message: error.message || "Error al obtener componente de computador",
            },
        };
    }
};

export const addComputerComponent = async (componentData: any) => {
    try {
        const response = await axios.post(API_COMPUTER_COMPONENT, componentData);
        return {
            success: true,
            result: response.data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: error.message || "Error al añadir componente de computador",
            },
        };
    }
};

export const editComputerComponent = async (id:number, componentData: any) => {
    try {
        const response = await axios.put(`${API_COMPUTER_COMPONENT}/${id}`, componentData);
        return {
            success: true,
            result: response.data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: error.message || "Error al editar componente de computador",
            },
        };
    }
};

export const deleteComputerComponent = async (id:Number) => {
    try {
        const response = await axios.delete(`${API_COMPUTER_COMPONENT}/${id}`);
        return {
            success: true,
            result: response.data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: error.message || "Error al eliminar componente de computador",
            },
        };
    }
};

// Funciones para Componente Gabinete

export const getAllCaseComponents = async () => {
    try {
        const response = await axios.get(API_CASE_COMPONENT);
        return {
            success: true,
            components: response.data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: error.message || "Error al obtener componentes de gabinete",
            },
        };
    }
};

export const getCaseComponentById = async (id:Number) => {
    try {
        const response = await axios.get(`${API_CASE_COMPONENT}/${id}`);
        return {
            success: true,
            component: response.data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: error.message || "Error al obtener componente de gabinete",
            },
        };
    }
};

export const addCaseComponent = async (componentData:any) => {
    try {
        const response = await axios.post(API_CASE_COMPONENT, componentData);
        return {
            success: true,
            result: response.data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: error.message || "Error al añadir componente de gabinete",
            },
        };
    }
};

export const editCaseComponent = async (id:Number, componentData:any) => {
    try {
        const response = await axios.put(`${API_CASE_COMPONENT}/${id}`, componentData);
        return {
            success: true,
            result: response.data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: error.message || "Error al editar componente de gabinete",
            },
        };
    }
};

export const deleteCaseComponent = async (id:Number) => {
    try {
        const response = await axios.delete(`${API_CASE_COMPONENT}/${id}`);
        return {
            success: true,
            result: response.data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: error.message || "Error al eliminar componente de gabinete",
            },
        };
    }
};

export const unsubscribeCaseComponent = async (id:Number) => {
    try {
        const response = await axios.put(`${API_CASE_COMPONENT}/unsubscribe/${id}`);
        return {
            success: true,
            result: response.data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: error.message || "Error al dar de baja componente de gabinete",
            },
        };
    }
};

export const getCaseComponentsRelated = async (id:Number) => {
    try {
        const response = await axios.get(`${API_CASE_COMPONENT}/case_related/${id}`);
        return {
            success: true,
            components: response.data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: error.message || "Error al obtener componentes relacionados de gabinete",
            },
        };
    }
};
