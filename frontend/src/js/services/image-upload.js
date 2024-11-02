// frontend/js/services/image-upload.js
function handleImageUpload(files, previewContainer) {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    
    Array.from(files).forEach(file => {
        if (!allowedTypes.includes(file.type)) {
            showError('Invalid file type. Please upload images only.');
            return;
        }

        if (file.size > maxSize) {
            showError('File too large. Maximum size is 5MB.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.createElement('div');
            preview.className = 'relative inline-block mr-2 mb-2';
            preview.innerHTML = `
                <img src="${e.target.result}" class="w-24 h-24 object-cover rounded-md">
                <button type="button" class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center" onclick="this.parentElement.remove()">×</button>
            `;
            previewContainer.appendChild(preview);
        };
        reader.readAsDataURL(file);
    });
}