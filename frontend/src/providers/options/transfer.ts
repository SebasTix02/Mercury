import { API_URL } from "../data";
import axios from 'axios';

const API_TRANSFER = `${API_URL}/custodian`

export const getAssetsByCustodian = async (custodian:any) => {
    try {
        const response = await axios.post(`${API_TRANSFER}`, {currentCustodian: custodian});
        const data = response.data.map((item:any) => ({
            ...item,
            ENTRY_DATE: new Date(item.ENTRY_DATE).toISOString().split('T')[0]
        }));
        return {
            success: true,
            assets: data,
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

export const transferAssets = async (transfer: any) => {
    try {
        console.log("desde el fetch: ", transfer)
        const response = await axios.put(`${API_TRANSFER}`, transfer);
        const data = response.data;
        return {
            success: true,
            transfer: data,
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

