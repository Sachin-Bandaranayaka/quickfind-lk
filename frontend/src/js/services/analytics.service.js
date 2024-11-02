// frontend/js/services/analytics.service.js
const analyticsService = {
    async getServiceStats(serviceId) {
        const response = await fetch(`${API_BASE_URL}/services/${serviceId}/stats`, {
            headers: apiService.getHeaders()
        });
        return response.json();
    },

    async getProviderStats() {
        const response = await fetch(`${API_BASE_URL}/provider/stats`, {
            headers: apiService.getHeaders()
        });
        return response.json();
    }
};

// Add this to your service-management.js
async function displayServiceAnalytics() {
    const stats = await analyticsService.getProviderStats();
    const analyticsContainer = document.getElementById('analyticsContainer');
    
    analyticsContainer.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div class="bg-white p-4 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold text-gray-600">Total Views</h3>
                <p class="text-3xl font-bold text-primary">${stats.totalViews}</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold text-gray-600">Total Bookings</h3>
                <p class="text-3xl font-bold text-primary">${stats.totalBookings}</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold text-gray-600">Average Rating</h3>
                <p class="text-3xl font-bold text-primary">${stats.averageRating.toFixed(1)}</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold text-gray-600">Total Revenue</h3>
                <p class="text-3xl font-bold text-primary">LKR ${stats.totalRevenue}</p>
            </div>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 class="text-xl font-bold mb-4">Booking Trends</h3>
            <canvas id="bookingTrendsChart"></canvas>
        </div>
    `;

    // Initialize charts using Chart.js
    initializeCharts(stats);
}

function initializeCharts(stats) {
    const ctx = document.getElementById('bookingTrendsChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: stats.bookingTrends.map(item => item.date),
            datasets: [{
                label: 'Bookings',
                data: stats.bookingTrends.map(item => item.count),
                borderColor: '#1e40af',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
}