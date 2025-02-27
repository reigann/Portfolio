document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("starry-bg");
    const ctx = canvas.getContext("2d");
  
    // Set canvas dimensions to fill the screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    // Star class
    class Star {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 0.8 + 0.01; // Smaller stars between 0.2 and 1
        this.baseX = this.x; // Original position
        this.baseY = this.y; // Original position
        this.density = Math.random() * 50 + 1; // Higher density for smoother movement
        this.opacity = 0; // Start invisible
        this.scale = 0; // Start with no size
        this.delay = Math.random() * 2000; // Random delay for each star (0 to 3 seconds)
      }
  
      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`; // White color with opacity
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * this.scale, 0, Math.PI * 1); // Scale the star size
        ctx.closePath();
        ctx.fill();
      }
  
      update(mouse) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
  
        // Parallax effect: Move stars based on cursor position
        if (distance < 800) { // Increased radius of interaction
          this.x = this.baseX - (mouse.x - canvas.width / 2) / this.density;
          this.y = this.baseY - (mouse.y - canvas.height / 2) / this.density;
        } else {
          // Return to original position smoothly
          if (this.x !== this.baseX) {
            this.x += (this.baseX - this.x) * 0.03; // Smoother interpolation
          }
          if (this.y !== this.baseY) {
            this.y += (this.baseY - this.y) * 0.03; // Smoother interpolation
          }
        }
  
        // Gradual appearance of stars
        if (this.opacity < 1 && Date.now() > this.delay) {
          this.opacity += 0.005; // Fade in slowly
          this.scale += 0.01; // Scale up slowly
        }
      }
    }
  
    // Array to hold stars
    const starsArray = [];
  
    // Create stars
    function createStars() {
      const numberOfStars = 100; // More stars for better effect
      for (let i = 0; i < numberOfStars; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        starsArray.push(new Star(x, y));
      }
    }
  
    // Animate stars
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      starsArray.forEach((star) => {
        star.draw();
        star.update(mouse);
      });
  
      requestAnimationFrame(animate);
    }
  
    // Mouse object to track cursor position
    const mouse = {
      x: null,
      y: null,
    };
  
    // Update mouse position on mouse move
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });
  
    // Handle window resize
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      starsArray.length = 0; // Clear existing stars
      createStars(); // Reinitialize stars
    });
  
    // Initialize stars after text animation completes
    setTimeout(() => {
      createStars();
      animate();
    }, 4000); // Delay for 4 seconds to match text animation duration
  });
  
  // Scramble Text Effect
  document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".navbar-right a");
  
    // Function to generate random characters
    function getRandomChar() {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      return chars[Math.floor(Math.random() * chars.length)];
    }
  
    // Function to scramble text
    function scrambleText(element, originalText) {
      let iteration = 0;
      const interval = 100; // Speed of scrambling (in milliseconds)
      const duration = 800; // Total duration of the effect (in milliseconds)
  
      const scrambleInterval = setInterval(() => {
        element.textContent = originalText
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return getRandomChar();
          })
          .join("");
  
        iteration++;
  
        if (iteration > originalText.length) {
          clearInterval(scrambleInterval);
          element.textContent = originalText; // Restore original text
        }
      }, interval);
    }
  
    // Add hover event listeners to navbar links
    navLinks.forEach((link) => {
      const originalText = link.textContent;
  
      link.addEventListener("mouseenter", () => {
        scrambleText(link, originalText);
      });
  
      link.addEventListener("mouseleave", () => {
        link.textContent = originalText; // Ensure text resets on mouse leave
      });
    });
  });