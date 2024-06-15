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
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
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
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};
export const getComputerComponentsByComputerId = async (id: number) => {
    try {
        const response = await axios.get(`${API_COMPUTER_COMPONENT}/computer_related/${id}`);
        return {
            success: true,
            components: response.data,
        };
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
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
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
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
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
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
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
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
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
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
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
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
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
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
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
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
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
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
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};

export const getCaseComponentsRelated = async (id: Number) => {
    try {
        const response = await axios.get(`${API_CASE_COMPONENT}/case_related/${id}`);
        const data = response.data.map((item: any) => ({
            ...item,
            UPGRADE_DATE: item.UPGRADE_DATE ? new Date(item.UPGRADE_DATE).toISOString().split('T')[0] : null
        }));
        return {
            success: true,
            components: data,
        };
    } catch (error: any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};

