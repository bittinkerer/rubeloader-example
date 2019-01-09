/*
* Converts from degrees to radians.
*/
Math.radians = function (degrees) {
  return degrees * Math.PI / 180;
};

/*
 * Converts from radians to degrees.
 */
Math.degrees = function (radians) {
  return radians * 180 / Math.PI;
};

/*
 * normalize2
 * Returns the normal of the vector b.
 */
function normalize2(b) {
  return Math.sqrt(b.x * b.x + b.y * b.y);
}

/*
 * Return unit vector u given vector v
 */
function unitVector(v) {
  if (!(v instanceof b2Vec2)) {
    throw 'Parameter is not of type b2Vec2';
  }
  var magnitude = normalize2(v);
  return new b2Vec2(v.x / magnitude, v.y / magnitude);
}



/*
 * clamp function to maintain number between boudaries
 */
Math.clamp = function (x, min, max) {
  if (x < min) return min;
  if (x > max) return max;
  return x;
}

/*
 *
 */
b2Vec2.prototype.toUnitVector = function () {
  var magnitude = normalize2(this);
  return new b2Vec2(this.x / magnitude, this.y / magnitude);
}

b2Vec2.prototype.scale = function (multiplier) {
  return new b2Vec2(this.x * multiplier, this.y * multiplier);
}

b2Vec2.prototype.addTo = function (a) {
  return new b2Vec2(this.x + a.x, this.y + a.y);
}

/*
 * remove every instance of item from the array
 */
Array.prototype.erase = function (item) {
  var count = 0;
  for (var i = this.length; i--; i) {
    if (this[i] === item) {
      count++;
      this.splice(i, 1);
    }
  }

  return count;
};

function getMousePos(event, src_elem) {
  var totalOffsetX = 0;
  var totalOffsetY = 0;
  var x_pos = 0;
  var y_pos = 0;
  var currElement = src_elem;

  // IE, Chrome
  if (event.offsetX !== undefined && event.offsetY !== undefined) {
    x_pos = event.offsetX;
    y_pos = event.offsetY;
  }

  // Firefox
  else {
    do {
      totalOffsetX += currElement.offsetLeft - currElement.scrollLeft;
      totalOffsetY += currElement.offsetTop - currElement.scrollTop;
    }
    while (currElement = currElement.offsetParent)

    x_pos = event.pageX - totalOffsetX - document.body.scrollLeft;
    y_pos = event.pageY - totalOffsetY - document.body.scrollTop;
  }

  return { x: x_pos, y: y_pos };
}