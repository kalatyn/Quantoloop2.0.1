export function initCanvas() {
  const canvas = document.getElementById("network");
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth * 2);
  let height = (canvas.height = window.innerHeight * 2);
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.scale(2, 2);

  const mouse = { x: width / 2, y: height / 2 };
  const points = [];
  const numPoints = 200; // Reduced number of points
  const pointRadius = 3;
  const lineDistance = 200;

  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 0.7; // Reduced speed
      this.vy = (Math.random() - 0.5) * 0.7; // Reduced speed
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x / 2, this.y / 2, pointRadius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 128, 255, 0.8)";
      ctx.fill();
    }
  }

  function createPoints() {
    for (let i = 0; i < numPoints; i++) {
      points.push(new Point(Math.random() * width, Math.random() * height));
    }
  }

  function drawLines() {
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dist = Math.hypot(
          points[i].x - points[j].x,
          points[i].y - points[j].y
        );
        const alpha = 1 - dist / lineDistance;
        ctx.strokeStyle = `rgba(0, 128, 255, ${alpha})`;
        ctx.lineWidth = 0.3;
        ctx.beginPath();
        ctx.moveTo(points[i].x / 2, points[i].y / 2);
        ctx.lineTo(points[j].x / 2, points[j].y / 2);
        ctx.stroke();
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    points.forEach((point) => {
      point.update();
      point.draw();
    });

    drawLines();
    requestAnimationFrame(animate);
  }

  canvas.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX * 2;
    mouse.y = e.clientY * 2;
    points.forEach((point) => {
      const dist = Math.hypot(point.x - mouse.x, point.y - mouse.y);
      if (dist < 100) {
        point.vx += (mouse.x - point.x) * 0.008; // Reduced interaction
        point.vy += (mouse.y - point.y) * 0.008; // Reduced interaction
      }
    });
  });

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth * 2;
    height = canvas.height = window.innerHeight * 2;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.scale(2, 2);
  });

  createPoints();
  animate();
}
