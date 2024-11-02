// frontend/js/services/search.service.js
const searchService = {
    async searchServices(query, filters = {}) {
        const queryParams = new URLSearchParams({
            q: query,
            ...filters
        });

        const response = await fetch(`${API_BASE_URL}/services/search?${queryParams}`, {
            headers: apiService.getHeaders()
        });
        return response.json();
    },

    async getCategories() {
        const response = await fetch(`${API_BASE_URL}/categories`, {
            headers: apiService.getHeaders()
        });
        return response.json();
    }
};

// Add this to your service-management.js
function initializeFilters() {
    const filterForm = document.getElementById('filterForm');
    
    filterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(filterForm);
        const filters = Object.fromEntries(formData.entries());
        
        try {
            const services = await searchService.searchServices(filters.query, {
                category: filters.category,
                minPrice: filters.minPrice,
                maxPrice: filters.maxPrice,
                location: filters.location,
                rating: filters.rating
            });
            displayServices(services);
        } catch (error) {
            console.error('Error filtering services:', error);
            showError('Failed to filter services');
        }
    });
}