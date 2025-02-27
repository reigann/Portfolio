document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("page-transition-overlay");
    const aboutSection = document.querySelector(".about");
  
    // Trigger page transition animation
    function triggerPageTransition() {
      // Show the overlay (expand from left)
      overlay.classList.add("active");
      // Hide the overlay after a delay (shrink to right)
      setTimeout(() => {
        overlay.classList.remove("active");
        overlay.classList.add("exit");
        // Show the about section after the overlay is gone
        setTimeout(() => {
          aboutSection.classList.add("visible");
        }, 400); // Match this delay with the overlay exit animation duration
      }, 800); // Match this delay with the overlay active animation duration
    }
  
    // Initialize the page transition
    triggerPageTransition();
  
    // Canvas setup for interactive background
    const canvas = document.getElementById("interactive-bg");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 0.5 + 0.1; // Particles are small
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 30 + 1;
        this.opacity = 1; // Start fully visible
      }
  
      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`; // Add opacity for fading effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
  
      update(mouse) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < 80) { // Reduced radius of interaction
          // Move particles away very quickly to avoid touching the cursor
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          this.x -= forceDirectionX * 20; // Extremely fast movement
          this.y -= forceDirectionY * 20;
          this.size = Math.max(this.size - 0.05, 0); // Shrink particles very quickly
          this.opacity = Math.max(this.opacity - 0.2, 0); // Fade out extremely quickly
        } else {
          // Return to original position smoothly
          if (this.x !== this.baseX) {
            this.x += (this.baseX - this.x) * 0.1; // Smooth interpolation
          }
          if (this.y !== this.baseY) {
            this.y += (this.baseY - this.y) * 0.1; // Smooth interpolation
          }
          this.size = Math.min(this.size + 0.01, 0.6); // Restore size slowly
          this.opacity = Math.min(this.opacity + 0.05, 1); // Fade back in smoothly
        }
      }
    }
  
    const particlesArray = [];
  
    function init() {
      const rows = 30;
      const cols = 90;
      const spacingX = canvas.width / cols;
      const spacingY = canvas.height / rows;
  
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const posX = x * spacingX + spacingX / 2;
          const posY = y * spacingY + spacingY / 2;
          particlesArray.push(new Particle(posX, posY));
        }
      }
    }
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      particlesArray.forEach((particle) => {
        particle.draw();
        particle.update(mouse);
      });
  
      requestAnimationFrame(animate);
    }
  
    const mouse = { x: null, y: null };
  
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });
  
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesArray.length = 0; // Clear existing particles
      init(); // Reinitialize particles
    });
  
    init();
    animate();
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