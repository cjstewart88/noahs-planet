var controller = null;
var buttonMap = {
  0: 'a',
  1: 'b',
  2: 'x',
  3: 'y'
}
var xAxis = 0;
var yAxis = 0;

var can = document.getElementById('can');
var canContext = can.getContext('2d');

var maxX = null;
var maxY = null;
var redrawCanvas = function() {
  can.width   = window.innerWidth;
  can.height  = window.innerHeight;
  canContext.clearRect(0, 0, canvas.width, canvas.height);
  maxX = can.width - 10;
  maxY = can.height - 10;
}
var x = 0;
var y = 0;
var minX = 0;
var minY = 0;

window.addEventListener("gamepadconnected", function(e) {
  controller = e.gamepad;
});

window.addEventListener("gamepaddisconnected", function(e) {
  controller = null;
});

var detectControllerInput = function() {
  requestAnimationFrame(detectControllerInput)
  redrawCanvas();
  controller = navigator.getGamepads()[0];

  if (controller) {
    for (var i = 0; i < controller.buttons.length; i++) {
      var button = controller.buttons[i];

      if (button.pressed) {
        console.log(buttonMap[i] + ' pressed')
      }
    }

    xAxis = controller.axes[0].toFixed(4)
    yAxis = controller.axes[1].toFixed(4)

    if (xAxis > 0.1 || xAxis < -0.1) {
      if (x < maxX && xAxis > 0) {
        x += 2;
      }

      if (x > minX && xAxis < 0) {
        x -= 2;
      }
    }

    if (yAxis > 0.1 || yAxis < -0.1) {
      if (y < maxY && yAxis > 0) {
        y += 2;
      }

      if (y > minX && yAxis < 0) {
        y -= 2;
      }
    }

    canContext.fillRect(x, y, 10, 10);
  } else {
    canContext.font = "24px serif";
    canContext.fillText("Move the left analog stick to move the block!", 10, 50);
  }
}

detectControllerInput()
