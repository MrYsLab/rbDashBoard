var rightSpeed, leftSpeed;

var gauge = new RGraph.Gauge({
  id: 'cvs',
  min: 0,
  max: 100,
  value: 0,
  options: {
    angles: {
      start: RGraph.PI - (RGraph.PI / 8),
      end: RGraph.TWOPI + (RGraph.PI / 8)
    },
    shadow: false,
    text: {
      color: 'white'
    },
    tickmarks: {
      big: {
        color: 'white'
      },
      medium: {
        color: 'white'
      },
      small: {
        color: 'white'
      }
    },
    colors: {
      ranges: []
    },
    background: {
      color: 'black'
    },
    border: {
      inner: 'black',
      outer: 'black',
      outline: 'black'
    },
    needle: {
      colors: ['red'],
      type: 'line',
      tail: true
    },
    centerpin: {
      radius: 0.1
    },
    title: {
      top: {
        self: 'Speed',
        color: 'white'
      },
      bottom: {
        self: '% Max',
        color: '#aaa'
      },
    },
    labels: {
      centered: true,
      offset: 7
    }
  }
}).draw();


/**
* This draws a simple gray circle over the centerpin
*/
function myCenterpin(obj) {
  // This circle becomes the border of the centerpin
  obj.context.beginPath();
  obj.context.fillStyle = '#aaa';
  obj.context.arc(obj.centerx, obj.centery, 10, 0, RGraph.TWOPI, false);
  obj.context.fill();
}

RGraph.AddCustomEventListener(gauge, 'ondraw', myCenterpin);
gauge.draw();

/**
* This event listener facilitates you being able to click and adjust the gauge
*/
gauge.canvas.onclick = function (e) {
  var obj = e.target.__object__;
  //noinspection UnnecessaryLocalVariableJS
  var value = obj.getValue(e);
  console.log(value)
  obj.value = value;
  leftSpeed = value;
  obj.grow();
};

var gauge2 = new RGraph.Gauge({
  id: 'cvs2',
  min: 0,
  max: 300,
  value: 0,
  options: {
    angles: {
      start: RGraph.PI - (RGraph.PI / 8),
      end: RGraph.TWOPI + (RGraph.PI / 8)
    },
    shadow: false,
    text: {
      color: 'white'
    },
    tickmarks: {
      big: {
        color: 'white'
      },
      medium: {
        color: 'white'
      },
      small: {
        color: 'white'
      }
    },
    colors: {
      ranges: []
    },
    background: {
      color: 'black'
    },
    border: {
      inner: 'black',
      outer: 'black',
      outline: 'black'
    },
    needle: {
      colors: ['red'],
      type: 'line',
      tail: true
    },
    centerpin: {
      radius: 0.1
    },
    title: {
      top: {
        self: 'Ticks/100 ms.',
        color: 'white',
        size: '12'
      }
    },
    labels: {
      centered: true,
      offset: 7
    }
  }
}).draw();


/**
* This draws a simple gray circle over the centerpin
*/
function myCenterpin(obj) {
  // This circle becomes the border of the centerpin
  obj.context.beginPath();
  obj.context.fillStyle = '#aaa';
  obj.context.arc(obj.centerx, obj.centery, 10, 0, RGraph.TWOPI, false);
  obj.context.fill();
}

RGraph.AddCustomEventListener(gauge2, 'ondraw', myCenterpin);
gauge2.draw();

var gauge3 = new RGraph.Gauge({
  id: 'cvsr',
  min: 0,
  max: 100,
  value: 0,
  options: {
    angles: {
      start: RGraph.PI - (RGraph.PI / 8),
      end: RGraph.TWOPI + (RGraph.PI / 8)
    },
    shadow: false,
    text: {
      color: 'white'
    },
    tickmarks: {
      big: {
        color: 'white'
      },
      medium: {
        color: 'white'
      },
      small: {
        color: 'white'
      }
    },
    colors: {
      ranges: []
    },
    background: {
      color: 'black'
    },
    border: {
      inner: 'black',
      outer: 'black',
      outline: 'black'
    },
    needle: {
      colors: ['red'],
      type: 'line',
      tail: true
    },
    centerpin: {
      radius: 0.1
    },
    title: {
      top: {
        self: 'Speed',
        color: 'white'
      },
      bottom: {
        self: '% Max',
        color: '#aaa'
      },
    },
    labels: {
      centered: true,
      offset: 7
    }
  }
}).draw();

/**
* This draws a simple gray circle over the centerpin
*/
function myCenterpin(obj) {
  // This circle becomes the border of the centerpin
  obj.context.beginPath();
  obj.context.fillStyle = '#aaa';
  obj.context.arc(obj.centerx, obj.centery, 10, 0, RGraph.TWOPI, false);
  obj.context.fill();
}
RGraph.AddCustomEventListener(gauge3, 'ondraw', myCenterpin);
gauge3.draw();

/**
* This event listener facilitates you being able to click and adjust the gauge
*/
gauge3.canvas.onclick = function (e) {
  var obj = e.target.__object__;
  //noinspection UnnecessaryLocalVariableJS,UnnecessaryLocalVariableJS
  var value = obj.getValue(e);
  obj.value = value;
  rightSpeed = value;
  obj.grow();
}

var gauge4 = new RGraph.Gauge({
  id: 'cvsr2',
  min: 0,
  max:300,
  value: 0,
  options: {
    angles: {
      start: RGraph.PI - (RGraph.PI / 8),
      end: RGraph.TWOPI + (RGraph.PI / 8)
    },
    shadow: false,
    text: {
      color: 'white'

    },
    tickmarks: {
      big: {
        color: 'white'
      },
      medium: {
        color: 'white'
      },
      small: {
        color: 'white'
      }
    },
    colors: {
      ranges: []
    },
    background: {
      color: 'black'
    },
    border: {
      inner: 'black',
      outer: 'black',
      outline: 'black'
    },
    needle: {
      colors: ['red'],
      type: 'line',
      tail: true
    },
    centerpin: {
      radius: 0.1
    },
    title: {
      top: {
        self: 'Ticks/100 ms',
        color: 'white',
        size: '12'
      }
    },
    labels: {
      centered: true,
      offset: 7
    }
  }
}).draw();

/**
* This draws a simple gray circle over the centerpin
*/
function myCenterpin(obj) {
  // This circle becomes the border of the centerpin
  obj.context.beginPath();
  obj.context.fillStyle = '#aaa';
  obj.context.arc(obj.centerx, obj.centery, 10, 0, RGraph.TWOPI, false);
  obj.context.fill();
}

RGraph.AddCustomEventListener(gauge4, 'ondraw', myCenterpin);
gauge4.draw();
