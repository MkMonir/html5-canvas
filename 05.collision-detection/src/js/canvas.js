const utils = require('./utils');
const { randomIntFromRange, getDistance, randomColor } = utils;

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth - 10;
canvas.height = innerHeight - 10;

const mouse = {
  x: 10,
  y: 10,
};

const colors = ['#2185C5', '#7ECEFD', '#FF7F66'];

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

/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

function rotate(velocity, angle) {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
  };

  return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle, otherParticle) {
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // Grab angle between the two colliding particles
    const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

    // Store mass in var for better readability in collision equation
    const m1 = particle.mass;
    const m2 = otherParticle.mass;

    // Velocity before equation
    const u1 = rotate(particle.velocity, angle);
    const u2 = rotate(otherParticle.velocity, angle);

    // Velocity after 1d collision equation
    const v1 = { x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2), y: u1.y };
    const v2 = { x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2), y: u2.y };

    // Final velocity after rotating axis back to original location
    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    // Swap particle velocities for realistic bounce effect
    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;

    otherParticle.velocity.x = vFinal2.x;
    otherParticle.velocity.y = vFinal2.y;
  }
}

// Objects
class Particle {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.velocity = {
      x: (Math.random() - 0.5) * 5,
      y: (Math.random() - 0.5) * 5,
    };
    this.size = size;
    this.color = color;
    this.mass = 1;
    this.opacity = 0;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    c.save();
    c.globalAlpha = this.opacity;
    c.fillStyle = this.color;
    c.fill();
    c.restore();
    c.strokeStyle = this.color;
    c.stroke();
    c.closePath();
  }

  update(particles) {
    this.draw();

    for (let i = 0; i < particles.length; i++) {
      if (this === particles[i]) continue;

      if (getDistance(this.x, this.y, particles[i].x, particles[i].y) - this.size * 2 < 0) {
        resolveCollision(this, particles[i]);
      }
    }

    if (this.x - this.size <= 0 || this.x + this.size >= canvas.width) {
      this.velocity.x = -this.velocity.x;
    }

    if (this.y - this.size <= 0 || this.y + this.size >= canvas.height) {
      this.velocity.y = -this.velocity.y;
    }

    // Mouse collision
    if (getDistance(mouse.x, mouse.y, this.x, this.y) < 120 && this.opacity < 0.2) {
      this.opacity += 0.02;
    } else if (this.opacity > 0) {
      this.opacity -= 0.02;
      this.opacity = Math.max(0, this.opacity);
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}
// Implementation
// let particle1;
// let particle2;

let particles;
const init = function () {
  particles = [];
  for (let i = 0; i < 150; i++) {
    const size = 15;
    let x = randomIntFromRange(size, canvas.width - size);
    let y = randomIntFromRange(size, canvas.height - size);
    const color = randomColor(colors);

    if (i !== 0) {
      for (let j = 0; j < particles.length; j++) {
        if (getDistance(x, y, particles[j].x, particles[j].y) - size * 2 < 0) {
          x = randomIntFromRange(size, canvas.width - size);
          y = randomIntFromRange(size, canvas.height - size);
          j = -1;
        }
      }
    }

    particles.push(new Particle(x, y, size, color));
  }

  // particle1 = new particle(300, 300, 100, 'black');
  // particle2 = new particle(10, 10, 30, 'red');
};

// Animation Loop
const animate = function () {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update(particles);
  });

  // particle1.draw();
  // particle2.x = mouse.x;
  // particle2.y = mouse.y;
  // particle2.draw();

  // if (getDistance(particle1.x, particle1.y, particle2.x, particle2.y) < particle1.size + particle2.size) {
  //   particle1.color = 'blue';
  // } else {
  //   particle1.color = 'black';
  // }
};

init();
animate();
