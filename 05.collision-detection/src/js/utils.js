exports.randomIntFromRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

exports.randomColor = function (colors) {
  return colors[Math.floor(Math.random() * colors.length)];
};

exports.getDistance = function (x1, y1, x2, y2) {
  const xDistance = x2 - x1;
  const yDistance = y2 - y1;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
};
