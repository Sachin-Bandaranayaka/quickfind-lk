// frontend/src/js/service-management.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const serviceForm = document.getElementById('serviceForm');
    const servicesList = document.getElementById('servicesList');
    const searchInput = document.getElementById('searchInput');
    const filterCategory = document.getElementById('filterCategory');
    const filterStatus = document.getElementById('filterStatus');
    let currentServices = [];

    // API Functions
    async function fetchServices() {
        try {
            showLoading();
            const response = await fetch('http://localhost:3000/api/services');
            const data = await response.json();
            hideLoading();
            
            if (data.success) {
                currentServices = data.data;
                return data.data;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error fetching services:', error);
            showError('Failed to load services');
            return [];
        }
    }

    async function createService(serviceData) {
        try {
            showLoading();
            const response = await fetch('http://localhost:3000/api/services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(serviceData)
            });
            const data = await response.json();
            hideLoading();

            if (data.success) {
                showSuccess('Service created successfully!');
                return data.data;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error creating service:', error);
            showError(error.message || 'Failed to create service');
            return null;
        }
    }

    // UI Functions
    function showLoading() {
        const loader = document.createElement('div');
        loader.id = 'loader';
        loader.className = 'fixed top-0 left-0 w-full h-1 bg-blue-500 animate-pulse';
        document.body.appendChild(loader);
    }

    function hideLoading() {
        const loader = document.getElementById('loader');
        if (loader) loader.remove();
    }

    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded';
        errorDiv.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${message}</span>
        `;
        document.body.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 5000);
    }

    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded';
        successDiv.innerHTML = `
            <strong class="font-bold">Success!</strong>
            <span class="block sm:inline">${message}</span>
        `;
        document.body.appendChild(successDiv);
        setTimeout(() => successDiv.remove(), 5000);
    }

    function displayServices(services) {
        if (!servicesList) return;

        if (!services || services.length === 0) {
            servicesList.innerHTML = `
                <div class="col-span-full text-center py-8 text-gray-500">
                    No services found. Click "Add New Service" to create one.
                </div>
            `;
            return;
        }

        servicesList.innerHTML = services.map(service => createServiceCard(service)).join('');
    }

    function createServiceCard(service) {
        return `
            <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 class="text-xl font-bold mb-2">${escapeHtml(service.title)}</h3>
                <p class="text-gray-600 mb-4">${escapeHtml(service.description)}</p>
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <span class="text-gray-500">Category:</span>
                        <span class="font-medium">${escapeHtml(service.category)}</span>
                    </div>
                    <div>
                        <span class="text-gray-500">Price:</span>
                        <span class="font-medium">${service.price} LKR (${service.priceType})</span>
                    </div>
                    <div>
                        <span class="text-gray-500">Location:</span>
                        <span class="font-medium">${escapeHtml(service.location)}</span>
                    </div>
                    <div>
                        <span class="text-gray-500">Service Area:</span>
                        <span class="font-medium">${service.serviceArea} km</span>
                    </div>
                </div>
                <div class="flex justify-between items-center">
                    <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                        ${service.status}
                    </span>
                    <div class="space-x-2">
                        <button onclick="editService('${service.id}')" 
                            class="text-blue-500 hover:text-blue-700">
                            Edit
                        </button>
                        <button onclick="deleteService('${service.id}')"
                            class="text-red-500 hover:text-red-700">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    function escapeHtml(unsafe) {
        if (!unsafe) return '';
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Form Handling
    if (serviceForm) {
        serviceForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = {
                title: document.getElementById('title')?.value?.trim(),
                description: document.getElementById('description')?.value?.trim(),
                category: document.getElementById('category')?.value,
                price: parseFloat(document.getElementById('price')?.value),
                priceType: document.getElementById('priceType')?.value,
                location: document.getElementById('location')?.value?.trim(),
                serviceArea: parseInt(document.getElementById('serviceArea')?.value)
            };

            // Validate form data
            if (!formData.title || !formData.description || !formData.category || 
                !formData.price || !formData.location || !formData.serviceArea) {
                showError('Please fill in all required fields');
                return;
            }

            const service = await createService(formData);
            if (service) {
                serviceForm.reset();
                closeServiceModal();
                const services = await fetchServices();
                displayServices(services);
            }
        });
    }

    // Filter and Search
    function filterServices() {
        let filtered = [...currentServices];

        const searchTerm = searchInput?.value.toLowerCase();
        const categoryFilter = filterCategory?.value;
        const statusFilter = filterStatus?.value;

        if (searchTerm) {
            filtered = filtered.filter(service => 
                service.title.toLowerCase().includes(searchTerm) ||
                service.description.toLowerCase().includes(searchTerm)
            );
        }

        if (categoryFilter) {
            filtered = filtered.filter(service => service.category === categoryFilter);
        }

        if (statusFilter) {
            filtered = filtered.filter(service => service.status === statusFilter);
        }

        displayServices(filtered);
    }

    // Event Listeners
    searchInput?.addEventListener('input', filterServices);
    filterCategory?.addEventListener('change', filterServices);
    filterStatus?.addEventListener('change', filterServices);

    // Initialize
    fetchServices().then(services => displayServices(services));
});

// Modal Functions (Global Scope)
window.openAddServiceModal = function() {
    const modal = document.getElementById('serviceModal');
    if (modal) {
        modal.classList.remove('hidden');
    }
};

window.closeServiceModal = function() {
    const modal = document.getElementById('serviceModal');
    if (modal) {
        modal.classList.add('hidden');
    }
};

window.editService = function(id) {
    // Implement edit functionality
    console.log('Edit service:', id);
};

window.deleteService = function(id) {
    // Implement delete functionality
    console.log('Delete service:', id);
};