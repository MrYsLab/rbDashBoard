var device = null;
var socket = null;
var isopen = false;

var t, z;

var d = new Date();
var start_time = d.getTime();
var time_sample;
var diff_time;

function motorControl() {
  var formdata = $('form').serialize();
  var firstIndex = formdata.indexOf('=');
  var secIndex = formdata.indexOf('&');
  var left_command = formdata.slice(firstIndex + 1, secIndex);
  console.log('left_command: ' + left_command);

  var thirdIndex = formdata.lastIndexOf('=');
  var right_command = formdata.slice(thirdIndex + 1, formdata.length);
  console.log('right_command: ' + right_command);

  var speedLeft = leftSpeed;
  if (!speedLeft) {
    speedLeft = 0;
  }
  speedLeft = Math.floor(speedLeft);
  speedLeft = speedLeft.toString();
  console.log(speedLeft);

  var speedRight = rightSpeed;
  if (!speedRight) {
    speedRight = 0;
  }
  speedRight = Math.floor(speedRight);
  speedRight = speedRight.toString();
  console.log(speedRight);

  var msg = JSON.stringify({
    "command": "motors", "left_command": left_command, "right_command": right_command,
    "left_speed": speedLeft, "right_speed": speedRight
  });
  window.socket.send(msg);
}

$(document).ready(function () {
  window.socket = new WebSocket("ws://127.0.0.1:9000");
  socket.onopen = function () {
    var msg = JSON.stringify({
      "command": "ready"
    });
    window.socket.send(msg);
    console.log("Connected!");
    isopen = true;
  };

  socket.onmessage = function (message) {
    var msg = JSON.parse(message.data);
    // console.log(message.data);
    switch (msg['info']) {
      case 'axis':
      var xx = msg['x'];
      var yy = msg['y'];
      var zz = msg['z'];
      Window.vprogressx.value = xx;
      Window.vprogressy.value = yy;
      Window.vprogressz.value = zz;
      Window.vprogressx.draw();
      Window.vprogressy.draw();
      Window.vprogressz.draw();
      break;
      case 'encoders':
      var left = msg['left'];
      var right = msg['right'];
      // console.log('left = ' + left + 'right = ' + right);
      Window.gauge4.value = right;
      Window.gauge4.draw();
      Window.gauge2.value = left;
      Window.gauge2.draw();
      break;
      case 'ir1':
      val = msg['data'];
      $('#ir1').val(val);
      break;
      case 'ir2':
      val = msg['data'];
      $('#ir2').val(val);
      break;
      case 'ir3':
      var val = msg['data'];
      $('#ir3').val(val);
      break;
      case 'pl':
      // val = msg['data'];
      // $('#orientation').val(val);
      break;
      case 'tap':
      if (msg['data']) {
        $('#abump').val("Bumped");
      } else {
        $('#abump').val("Accelerometer");
      }
      break;
      case 'l_bump':
      val = msg['data'];
      if (val) {
        vstring = "Bumped";
      }
      else
      vstring = "Left Bumper";
      $('#lbump').val(vstring);
      break;
      case 'r_bump':
      val = msg['data'];
      if (val) {
        vstring = "Bumped";
      }
      else {
        vstring = "Right Bumper";
      }
      $('#rbump').val(vstring);
      break;
    }
  };

  //noinspection JSUnusedLocalSymbols
  socket.onclose = function (e) {
    console.log("Connection closed.");
    socket = null;
    isopen = false;
  }
});
