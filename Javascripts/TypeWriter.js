const textElement = document.getElementById("text");
const messages = ["I'm Pranjal.", "Junior Web Designer.", "From India.", "Based in the UK."];
let messageIndex = 0; // To keep track of the current message

// Function to type out a message
function typeMessage(message) {
    return new Promise((resolve) => {
        let charIndex = 0; // To keep track of the current character being typed
        const typingSpeed = 60; // Speed when typing

        const type = () => {
            if (charIndex < message.length) {
                textElement.textContent += message.charAt(charIndex); // Append the next character
                charIndex++;
                setTimeout(type, typingSpeed); // Continue typing the next character
            } else {
                setTimeout(resolve, 1500); // Wait for 1.5 seconds after typing is complete
            }
        };

        type(); // Start typing the message
    });
}

// Function to delete a message
function deleteMessage() {
    return new Promise((resolve) => {
        let charIndex = textElement.textContent.length; // Start deleting from the end
        const deletingSpeed = 60; // Speed when deleting

        const deleteChar = () => {
            if (charIndex > 0) {
                textElement.textContent = textElement.textContent.slice(0, charIndex - 1); // Remove the last character
                charIndex--;
                setTimeout(deleteChar, deletingSpeed); // Continue deleting the last character
            } else {
                resolve(); // Resolve the promise once deletion is complete
            }
        };

        deleteChar(); // Start deleting the message
    });
}

// Main function to control the typing and deleting process
async function startTypingEffect() {
    while (true) { // Infinite loop to cycle through messages
        await typeMessage(messages[messageIndex]); // Type out the current message
        await deleteMessage(); // Delete the current message
        messageIndex = (messageIndex + 1) % messages.length; // Move to the next message
    }
}

// Start the typing effect
startTypingEffect();
