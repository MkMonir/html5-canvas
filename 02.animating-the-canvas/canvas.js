'use strict';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const innerWidth = 800;
const innerHeight = 600;

class Circle {
  constructor(x, y, size, dx, dy) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.dx = dx;
    this.dy = dy;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.strokeStyle = 'blue';
    ctx.stroke();
    ctx.fill();
  }

  update() {
    if (this.x + this.size > innerWidth || this.x - this.size < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.size > innerHeight || this.y - this.size < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

const circleArr = [];
for (let i = 0; i < 100; i++) {
  const size = 30;
  const x = Math.random() * (innerWidth - size * 2) + size;
  const y = Math.random() * (innerHeight - size * 2) + size;
  const dx = Math.random() - 0.5;
  const dy = Math.random() - 0.5;
  circleArr.push(new Circle(x, y, size, dx, dy));
}

const animate = function () {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArr.length; i++) {
    circleArr[i].update();
  }
};

animate();
