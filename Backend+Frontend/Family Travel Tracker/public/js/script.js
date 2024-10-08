document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleList');
    const countriesList = document.getElementById('countriesList');
    const closeButton = document.getElementById('closeButton');
    
    toggleButton.addEventListener('click', function() {
        countriesList.classList.toggle('hidden');
    });
    
    closeButton.addEventListener('click', function() {
        countriesList.classList.add('hidden');
    });

    // Add event listeners for edit and delete buttons if needed
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', function() {
            alert('Edit button clicked for ' + this.parentElement.textContent.trim());
        });
    });

    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this country?')) {
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const paths = document.querySelectorAll('#world-map path');
    const flagContainer = document.getElementById('flag-container');
    const flagImage = document.getElementById('flag');

    paths.forEach(path => {
        path.addEventListener('mouseenter', function() {
            const countryCode = this.id;
            flagImage.src = `flags/${countryCode}.png`; // Update flag image source
            flagContainer.style.display = 'block';
            flagContainer.style.top = `${event.clientY + 10}px`;
            flagContainer.style.left = `${event.clientX + 10}px`;
        });

        path.addEventListener('mouseleave', function() {
            flagContainer.style.display = 'none';
        });
    });
});

