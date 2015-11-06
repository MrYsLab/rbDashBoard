var device = null;
var socket = null;
var isopen = false;

var t, z;
var ENCODER_SAMPLING_SIZE = 10;
var encoder_counter = 0, prev_time_ms, left_counter = 0, right_counter = 0;

function motorControl() {
  var formdata = $('form').serialize();
  var firstIndex = formdata.indexOf('=');
  var secIndex = formdata.indexOf('&');
  var left_command = formdata.slice(firstIndex + 1, secIndex);
  //console.log('left_command: ' + left_command);

  var thirdIndex = formdata.lastIndexOf('=');
  var right_command = formdata.slice(thirdIndex + 1, formdata.length);
  //console.log('right_command: ' + right_command);

  var speedLeft = leftSpeed;
  if (!speedLeft) {
    speedLeft = 0;
  }
  speedLeft = Math.floor(speedLeft);
  speedLeft = speedLeft.toString();

  var speedRight = rightSpeed;
  if (!speedRight) {
    speedRight = 0;
  }
  speedRight = Math.floor(speedRight);
  speedRight = speedRight.toString();

  var msg = JSON.stringify({
    "command": "motors", "left_command": left_command, "right_command": right_command,
    "left_speed": speedLeft, "right_speed": speedRight
  });
  socket.send(msg);
}

$(document).ready(function () {
  socket = new WebSocket("ws://127.0.0.1:9000");
  socket.onopen = function () {
    var msg = JSON.stringify({
      "command": "ready"
    });
    socket.send(msg);
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
      vprogressx.value = xx;
      vprogressy.value = yy;
      vprogressz.value = zz;
      vprogressx.draw();
      vprogressy.draw();
      vprogressz.draw();
      break;
      case 'encoders':
        encoder_counter++;
        left_counter += msg['left'];
        right_counter += msg['right'];
        if (encoder_counter % ENCODER_SAMPLING_SIZE == 0) {
          // Take a sample of 10 readings to make the needle less jumpy.
          var d = new Date();
          var current_time = d.getTime();
          var time_delta_ms = current_time - prev_time_ms;
          prev_time_ms = current_time;
          var left = left_counter * 100 / time_delta_ms;
          var right = right_counter * 100 / time_delta_ms;
          //console.log('left = ' + left + '   right = ' + right + ' delta used ' + time_delta_ms);
          encoder_counter = 0;
          left_counter = 0;
          right_counter = 0;

          gauge4.value = right;
          gauge4.draw();
          gauge2.value = left;
          gauge2.draw();
        }

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
