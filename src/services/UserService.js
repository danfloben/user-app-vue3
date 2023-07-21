import axios from "axios";

const API_URL = "https://dummyjson.com/users";

export async function getUsers() {
    try {
        const response = await axios.get(API_URL);
        return response.data.users;
    } catch (error) {
        if (error.response) {
            return {
                error: "Error de respuesta del servidor",
                data: error.response.data,
                status: error.response.status,
                headers: error.response.headers
            };
        } else if (error.request) {
            return {
                error: "Error en la solicitud sin respuesta del servidor",
                request: error.request
            };
        } else {
            return {
                error: "Error de configuración de la solicitud",
                message: error.message
            };
        }
    }
}