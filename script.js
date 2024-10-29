document.addEventListener("DOMContentLoaded", () => {
    const staticText = "HAPPY BIRTHDAY ";
    const words = ["PAULO", "LOSER", "PLO", "CLOWN", "PLOBAE", "STINKER"];
    const messageElement = document.getElementById("birthday-message");
    const giftBox = document.getElementById("gift-box");
    const bounceImage = document.getElementById("bounce-image"); // Bouncing image element
    const scImage = document.getElementById("plosc");
    const cakeImage = document.getElementById("cake")
    const clickText = document.getElementById("click"); // Reference to the click text element
    let wordIndex = 0;
    let balloonsCount = 0;
    const maxBalloons = 1; // Maximum number of balloons at once

    function typeMessage(text, callback) {
        let i = 0;
        function type() {
            if (i < text.length) {
                messageElement.textContent += text.charAt(i);
                i++;
                setTimeout(type, 150);
            } else {
                setTimeout(callback, 1000);
            }
        }
        type();
    }

    function eraseLastWord(callback) {
        let fullText = staticText + words[0];
        function erase() {
            if (messageElement.textContent.length > staticText.length) {
                messageElement.textContent = messageElement.textContent.slice(0, -1);
                setTimeout(erase, 100);
            } else {
                callback();
            }
        }
        erase();
    }

    function loopLastWord() {
        typeMessage(words[wordIndex], () => {
            eraseLastWord(() => {
                wordIndex = (wordIndex + 1) % words.length;
                loopLastWord();
            });
        });
    }

    function startTypingLoop() {
        messageElement.style.display = "inline"; // Show the message element
        typeMessage(staticText + words[0], () => {
            eraseLastWord(() => {
                wordIndex = 1;
                loopLastWord();
            });
        });
    }

    function createBalloon() {
        const balloon = document.createElement('img');
        balloon.src = 'public/balloon1.svg'; // Path to your balloon SVG
        balloon.className = 'ballon'; // Add the balloon class

        // Position the balloon randomly within the width of the screen
        balloon.style.left = Math.random() * (window.innerWidth - 50) + 'px'; // Adjust based on the balloon width

        // Append to the body
        document.body.appendChild(balloon);
        balloonsCount++;

        // Start the animation
        setTimeout(() => {
            balloon.style.transform = 'translateY(-100vh)'; // Move the balloon upwards
            balloon.style.opacity = '0'; // Fade out
        }, 100); // Slight delay to start the upward movement

        // Remove the balloon after the animation
        setTimeout(() => {
            document.body.removeChild(balloon);
            balloonsCount--;

            // Spawn a new balloon to keep the count at maxBalloons
            if (balloonsCount < maxBalloons) {
                createBalloon(); // Spawn a new balloon when one is removed
            }
        }, 5000); // Match this with the duration of the float animation
    }

    function spawnBalloons() {
        // Initial spawning of balloons to start the continuous flow
        for (let i = 0; i < maxBalloons; i++) {
            createBalloon();
        }
    }

    giftBox.addEventListener("click", () => {
        giftBox.style.animation = "shake 0.1s infinite"; // Start shake animation
        setTimeout(() => {
            giftBox.style.animation = ""; // Stop shake animation
            clickText.style.display = "none"; // Hide the click text
            giftBox.style.display = "none"; // Hide gift box
            bounceImage.style.display = "block"; // Show the bouncing image
            scImage.style.display = "block"; // Show the bouncing image
            cakeImage.style.display = "block"; 
            startTypingLoop(); // Start the typing loop
            spawnBalloons(); // Start the balloon spawning
        }, 3000); // Shake for 3 seconds
    });
});
