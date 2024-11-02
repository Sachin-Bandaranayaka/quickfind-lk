// frontend/src/js/api.service.js
const API_BASE_URL = 'http://localhost:3000/api';

class ApiService {
    static async handleResponse(response) {
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }
        return data;
    }

    static async createService(serviceData) {
        try {
            const response = await fetch(`${API_BASE_URL}/services`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(serviceData)
            });
            return await this.handleResponse(response);
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    static async getServices() {
        try {
            const response = await fetch(`${API_BASE_URL}/services`);
            return await this.handleResponse(response);
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    static async updateService(id, serviceData) {
        try {
            const response = await fetch(`${API_BASE_URL}/services/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(serviceData)
            });
            return await this.handleResponse(response);
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    static async deleteService(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/services/${id}`, {
                method: 'DELETE'
            });
            return await this.handleResponse(response);
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
}

window.ApiService = ApiService;