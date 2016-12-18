var controller = null;

window.addEventListener("gamepadconnected", function(e) {
  controller = e.gamepad;
});

window.addEventListener("gamepaddisconnected", function(e) {
  controller = null;
});
