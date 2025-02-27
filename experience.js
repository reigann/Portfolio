document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("interactive-bg");
    const ctx = canvas.getContext("2d");
  
    // Set canvas dimensions to fill the screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    // Grid cell size
    const gridSize = 50;
  
    // Mouse object to track cursor position
    const mouse = { x: null, y: null };
  
    // Draw grid
    function drawGrid() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Draw grid lines only in a small area around the cursor
      if (mouse.x && mouse.y) {
        const radius = 150; // Radius of the visible grid area
        const startX = Math.max(mouse.x - radius, 0);
        const startY = Math.max(mouse.y - radius, 0);
        const endX = Math.min(mouse.x + radius, canvas.width);
        const endY = Math.min(mouse.y + radius, canvas.height);
  
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"; // Slightly dimmed grid lines
        ctx.lineWidth = 1;
  
        // Draw vertical lines
        for (let x = Math.floor(startX / gridSize) * gridSize; x <= endX; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, startY);
          ctx.lineTo(x, endY);
          ctx.stroke();
        }
  
        // Draw horizontal lines
        for (let y = Math.floor(startY / gridSize) * gridSize; y <= endY; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(startX, y);
          ctx.lineTo(endX, y);
          ctx.stroke();
        }
      } else {
        // If no cursor, make the background solid black
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  
    // Animate grid
    function animate() {
      drawGrid();
      requestAnimationFrame(animate);
    }
  
    // Update mouse position on mouse move
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });
  
    // Reset mouse position when not hovering
    window.addEventListener("mouseleave", () => {
      mouse.x = null;
      mouse.y = null;
    });
  
    // Handle window resize
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  
    // Initialize and start animation
    animate();
  
    // Timeline animations
    const timelineItems = document.querySelectorAll(".timeline-item");
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the item is visible
    );
  
    timelineItems.forEach((item) => {
      observer.observe(item);
    });
  });