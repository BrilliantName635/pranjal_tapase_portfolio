// Select the specific section where the effect should appear
const homeSection = document.querySelector("#home");

// Function to create and animate a circle
function createCircle(x, y) {
  // Create a new circle element
  const circle = document.createElement("div");
  circle.classList.add("circle");

  // Set random size (larger size range)
  const size = Math.random() * 50 + 20; // Random size between 20px and 70px
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;

  // Position the circle at the mouse location relative to the section
  const rect = homeSection.getBoundingClientRect();
  let posX = x - rect.left;
  let posY = y - rect.top;

  // Make sure the particle is inside the section
  posX = Math.max(0, Math.min(posX, rect.width - size)); // Confine horizontally
  posY = Math.max(0, Math.min(posY, rect.height - size)); // Confine vertically

  circle.style.left = `${posX}px`;
  circle.style.top = `${posY}px`;

  // Generate random colors
  const randomColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
  circle.style.backgroundColor = randomColor;

  // Generate random directions for x and y movement
  const randomX = (Math.random() - 0.5) * 100; // Random value between -50 and 50
  const randomY = (Math.random() - 0.5) * 100; // Random value between -50 and 50

  // Apply random transform properties to move the circle in a random direction
  circle.style.setProperty('--moveX', `${randomX}px`);
  circle.style.setProperty('--moveY', `${randomY}px`);

  // Add circle to the home section
  homeSection.appendChild(circle);

  // Remove the circle after 0.5 seconds
  setTimeout(() => {
    circle.remove();
  }, 500);
}

// Add mousemove event listener only to the home section
homeSection.addEventListener("mousemove", (e) => {
  const rect = homeSection.getBoundingClientRect();
  const x = e.clientX;
  const y = e.clientY;

  // Check if the cursor is inside the section
  if (
    x >= rect.left &&
    x <= rect.right &&
    y >= rect.top &&
    y <= rect.bottom
  ) {
    createCircle(e.clientX, e.clientY);
  }
});
