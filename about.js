document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("page-transition-overlay");
  const aboutSection = document.querySelector(".about");

  // Trigger page transition animation
  function triggerPageTransition() {
    overlay.classList.add("active");
    setTimeout(() => {
      overlay.classList.remove("active");
      overlay.classList.add("exit");
      setTimeout(() => {
        aboutSection.classList.add("visible");
      }, 400);
    }, 800);
  }

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
      this.size = Math.random() * 1 + 0.5; // Slightly larger particles for elegance
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = Math.random() * 50 + 10; // Slower parallax for elegance
      this.opacity = Math.random() * 0.5 + 0.5; // Subtle opacity for elegance
      this.twinkleSpeed = Math.random() * 0.01 + 0.005; // Slow twinkle for elegance
    }

    draw() {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity + Math.sin(Date.now() * this.twinkleSpeed) * 0.2})`; // White with subtle twinkle
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }

    update(mouse) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) { // Larger radius for smoother interaction
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        this.x += forceDirectionX * 2; // Gentle movement for elegance
        this.y += forceDirectionY * 2;
      } else {
        if (this.x !== this.baseX) this.x += (this.baseX - this.x) * 0.05;
        if (this.y !== this.baseY) this.y += (this.baseY - this.y) * 0.05;
      }
    }
  }

  const particlesArray = [];

  function init() {
    const rows = 20;
    const cols = 60;
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
    particlesArray.length = 0;
    init();
  });

  init();
  animate();

  // Scramble Text Effect for Navbar Links
  const navLinks = document.querySelectorAll(".navbar-right a");

  // Function to generate random characters
  function getRandomChar() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Only uppercase for elegance
    return chars[Math.floor(Math.random() * chars.length)];
  }

  // Function to scramble text with elegant glitch
  function scrambleText(element, originalText) {
    let iteration = 0;
    const interval = 70; // Slightly slower for elegance
    const duration = 600; // Longer duration for smoother effect

    const scrambleInterval = setInterval(() => {
      element.textContent = originalText
        .split("")
        .map((char, index) => {
          if (index < iteration) return originalText[index];
          return getRandomChar();
        })
        .join("");

      iteration++;

      if (iteration > originalText.length) {
        clearInterval(scrambleInterval);
        element.textContent = originalText;
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
      link.textContent = originalText;
    });
  });
});