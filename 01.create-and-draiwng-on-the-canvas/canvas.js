'use strict';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Rectangular
ctx.fillStyle = 'orangered';
ctx.fillRect(100, 100, 100, 100);
ctx.fillStyle = 'gray';
ctx.fillRect(400, 100, 100, 100);
ctx.fillStyle = 'rgba(0,255,0,0.5)';
ctx.fillRect(300, 300, 100, 100);

// Line
ctx.beginPath();
ctx.moveTo(30, 300);
ctx.lineTo(300, 100);
ctx.lineTo(400, 300);
ctx.strokeStyle = 'orangered';
ctx.stroke();

// Arc / Circle
// ctx.beginPath();
// ctx.fillStyle = 'black';
// ctx.arc(300, 300, 30, 0, Math.PI * 2, false);
// ctx.fill();

for (let i = 0; i < 3; i++) {
  const x = Math.floor(Math.random() * 800);
  const y = Math.floor(Math.random() * 600);
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.arc(x, y, 30, 0, Math.PI * 2, false);
  ctx.fill();
}
