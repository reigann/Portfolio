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
      this.size = Math.random() * 1 + 0.5;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = Math.random() * 30 + 1;
      this.opacity = 0;
      this.scale = 0;
      this.delay = Math.random() * 2000;
      this.twinkleSpeed = Math.random() * 0.02 + 0.01;
    }

    draw() {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity + Math.sin(Date.now() * this.twinkleSpeed) * 0.2})`; // White twinkle
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * this.scale, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }

    update(mouse) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 800) {
        this.x = this.baseX - (mouse.x - canvas.width / 2) / this.density;
        this.y = this.baseY - (mouse.y - canvas.height / 2) / this.density;
      } else {
        if (this.x !== this.baseX) this.x += (this.baseX - this.x) * 0.05;
        if (this.y !== this.baseY) this.y += (this.baseY - this.y) * 0.05;
      }

      if (this.opacity < 1 && Date.now() > this.delay) {
        this.opacity += 0.005;
        this.scale += 0.01;
      }
    }
  }

  // Particle class for elegant effect around the name
  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 2 - 1; // Slower movement for elegance
      this.speedY = Math.random() * 2 - 1; // Slower movement for elegance
      this.life = 120; // Longer life for smoother effect
      this.opacity = 1;
      this.color = `rgba(255, 255, 255, 0.8)`; // White particles for elegance
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life--;
      this.opacity = this.life / 120;
      this.size *= 0.98;
    }
  }

  // Array to hold stars and particles
  const starsArray = [];
  const particlesArray = [];

  // Create stars
  function createStars() {
    const numberOfStars = 200;
    for (let i = 0; i < numberOfStars; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      starsArray.push(new Star(x, y));
    }
  }

  // Create particles around the name on hover
  function createParticles(x, y) {
    for (let i = 0; i < 5; i++) { // Fewer particles for elegance
      particlesArray.push(new Particle(x, y));
    }
  }

  // Animate stars and particles
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    starsArray.forEach((star) => {
      star.draw();
      star.update(mouse);
    });

    particlesArray.forEach((particle, index) => {
      particle.draw();
      particle.update();
      if (particle.life <= 0) particlesArray.splice(index, 1);
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
    starsArray.length = 0;
    particlesArray.length = 0;
    createStars();
  });

  // Initialize stars after text animation completes
  setTimeout(() => {
    createStars();
    animate();
  }, 3000);

  // Add particle effect on name hover
  const nameSpans = document.querySelectorAll(".name span");
  nameSpans.forEach((span) => {
    span.addEventListener("mouseenter", (e) => {
      createParticles(e.clientX, e.clientY);
    });
  });

  // Scramble Text Effect for Navbar Links
  const navLinks = document.querySelectorAll(".navbar-right a");

  // Function to generate random characters
  function getRandomChar() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return chars[Math.floor(Math.random() * chars.length)]; // Only uppercase for elegance
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