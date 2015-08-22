var vprogressx = new RGraph.VProgress({
  id: 'x',
  min: 0,
  max: 5,
  value: 0,
  options: {
    colors: ['Gradient(green:red)'],
    title: 'X',
    numticks: 5,
    scale: {
      decimals: 1
    },
    gutter: {
      right: 50
    },
    margin: 15,
    tickmarks: {
      inner: true,
      zerostart: true
    },
  }
}).draw();

var vprogressy = new RGraph.VProgress({
  id: 'y',
  min: 0,
  max: 5,
  value: 0,
  options: {
    colors: ['Gradient(green:red)'],
    gutter: {
      right: 50
    },
    title: 'Y',
    numticks: 5,
    scale: {
      decimals: 1
    },
    margin: 15,
    tickmarks: {
      inner: true,
      zerostart: true
    },
  }
}).draw();

var vprogressz = new RGraph.VProgress({
  id: 'z',
  min: 0,
  max: 5,
  value: 0,
  options: {
    title: 'Z',
    numticks: 5,
    scale: {
      decimals: 1
    },
    colors: ['Gradient(green:red)'],
    gutter: {
      right: 50
    },
    margin: 15,
    tickmarks: {
      inner: true,
      zerostart: true
    },
  }
}).draw();
