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
var redrawCanvas = function() {
  can.width = can.height = 0;
  can.width   = 800;
  can.height  = 600;
}
var x = 0;
var y = 0;
var minX = 0;
var minY = 0;
var maxX = 790;
var maxY = 590;

window.addEventListener("gamepadconnected", function(e) {
  controller = e.gamepad;
});

window.addEventListener("gamepaddisconnected", function(e) {
  controller = null;
});

var detectControllerInput = function() {
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

    if (x < maxX && xAxis > 0) {
      x += 2;
    }

    if (x > minX && xAxis < 0) {
      x -= 2;
    }

    if (y < maxY && yAxis > 0) {
      y += 2;
    }

    if (y > minX && yAxis < 0) {
      y -= 2;
    }

    canContext.fillRect(x, y, 10, 10);
  }

  requestAnimationFrame(detectControllerInput)
}

detectControllerInput()
