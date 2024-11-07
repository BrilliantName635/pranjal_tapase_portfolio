// Select all sections and nav links
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('nav ul li a');
let menuCheckbox = document.getElementById('check'); // Checkbox for toggling menu

// Event listener to handle section highlighting on scroll
window.onscroll = () => {
    sections.forEach(section => {
        let top = window.scrollY;
        let offset = section.offsetTop - 150;
        let height = section.offsetHeight;
        let id = section.getAttribute('id');

        if (top >= offset && top < offset + height) {
            // Remove active class from all links and apply it to the current one
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector('nav ul li a[href*=' + id + ']').classList.add('active');
        }
    });
};

// Smooth scrolling behavior and menu hide on smaller screens
navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        let targetId = this.getAttribute('href').substring(1); // Get the section ID
        let targetSection = document.getElementById(targetId);
        window.scrollTo({
            top: targetSection.offsetTop - 100, // Adjust offset for fixed navbar height
            behavior: 'smooth'
        });
        
        // Check if screen width is below 890px and hide the menu
        if (window.innerWidth <= 890) {
            menuCheckbox.checked = false; // Uncheck the checkbox to hide the menu
        }
    });
});
