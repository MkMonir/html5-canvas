import utils, { randomColor, randomIntFromRange } from './utils';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth - 10;
canvas.height = innerHeight - 10;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

const gravity = 0.6;
const friction = 0.99;

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('resize', () => {
  canvas.width = innerWidth - 10;
  canvas.height = innerHeight - 10;

  init();
});

addEventListener('click', () => init());

// Objects
class Ball {
  constructor(x, y, dx, dy, size, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  }

  update() {
    if (this.y + this.size + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }

    if (this.x + this.size + this.dx > canvas.width || this.x - this.size <= 0) {
      this.dx = -this.dx;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

// Implementation
let ballArr = [];
const init = function () {
  ballArr = [];
  for (let i = 0; i < 400; i++) {
    const size = randomIntFromRange(8, 20);
    const x = randomIntFromRange(size, canvas.width - size);
    const y = randomIntFromRange(0, canvas.height - size);
    const dx = randomIntFromRange(-2, 2);
    const dy = randomIntFromRange(-2, 2);
    const color = randomColor(colors);
    ballArr.push(new Ball(x, y, dx, dy, size, color));
  }
};

// Animation Loop
const animate = function () {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < ballArr.length; i++) {
    ballArr[i].update();
  }
};

init();
animate();
