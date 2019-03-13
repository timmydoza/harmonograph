function Harmonograph() {
  let context, size, scale, timer, settings, line;

  function update(min, max) {
    let { xFreq, yFreq, zFreq, type, invert, rotaryType } = settings;
    const data = d3.range(min, max, 0.1).map(d => {
      const theta = (d / 180) * Math.PI;
      let x = Math.cos(theta * xFreq);
      let y = Math.sin(theta * yFreq);

      if (type === 'rotary') {
        let inv = invert ? zFreq : 1;
        if (rotaryType === 'countercurrent') {
          x -= Math.cos(theta * zFreq) / inv;
        } else {
          x += Math.cos(theta * zFreq) / inv;
        }
        y += Math.sin(theta * zFreq) / inv;
      }

      return [x, y];
    });

    context.beginPath();
    line.context(context)(data);
    context.stroke();
  }

  function init() {
    context = document.querySelector('canvas').getContext('2d');
    context.lineWidth = 4;
    canvasContainer = document.querySelector('.canvasContainer');
    size = window.innerHeight < canvasContainer.offsetWidth ? window.innerHeight : canvasContainer.offsetWidth;
    size -= 40; // Account for padding

    canvas = d3
      .select('canvas')
      .attr('width', size)
      .attr('height', size);

    scale = d3
      .scaleLinear()
      .domain([-2, 2])
      .range([0, size]);

    line = d3
      .line()
      .x(d => scale(d[0]))
      .y(d => scale(d[1]));
  }

  function startAnimation() {
    context.clearRect(0, 0, size, size);
    let last = 0;
    timer = d3.timer(elapsed => {
      update(last * settings.speed, elapsed * settings.speed + 1);
      last = elapsed;
    });
  }

  function stopAnimation() {
    timer && timer.stop();
  }

  function updateSettings(_) {
    settings = _;
  }

  return { init, startAnimation, stopAnimation, updateSettings };
}
