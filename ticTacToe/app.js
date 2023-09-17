document.addEventListener('DOMContentLoaded', function() {
    // Get the header elements
    const headerElements = document.querySelectorAll('header');

    // Apply transition effect after a short delay (adjust as needed)
    setTimeout(function() {
        headerElements.forEach(function(element) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        });
    }, 600); // Adjust the delay in milliseconds (0.5 seconds in this example)
});