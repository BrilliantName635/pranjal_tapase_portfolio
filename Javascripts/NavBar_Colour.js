document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.querySelector("nav");
    const navMenu = document.querySelector("nav ul");
    const checkBox = document.getElementById("check");

    // Function to apply or remove "scrolled" class based on scroll position
    function updateNavbarBackground() {
        if (window.scrollY > 50) { // Only add "scrolled" class if scrolled past 50px
            navbar.classList.add("scrolled");
            navMenu.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
            navMenu.classList.remove("scrolled");
        }
    }

    // Scroll event listener to update navbar and menu backgrounds
    window.addEventListener("scroll", updateNavbarBackground);

    // Checkbox event listener to handle background color on menu toggle
    checkBox.addEventListener("change", function() {
        // Only add "scrolled" class if menu is open AND page is scrolled
        if (checkBox.checked && window.scrollY > 50) {
            navbar.classList.add("scrolled");
            navMenu.classList.add("scrolled");
        } else if (!checkBox.checked && window.scrollY <= 50) {
            // Remove "scrolled" class if menu is closed and not scrolled
            navbar.classList.remove("scrolled");
            navMenu.classList.remove("scrolled");
        }
    });
});
