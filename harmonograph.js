function Harmonograph() {
  let ctx, size, scale, timer, settings, line;

  function update(min, max) {
    let { xFreq, yFreq, zFreq, type, invert, rotaryType, decay } = settings;
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

      x *= (1 - decay * 0.005) ** theta;
      y *= (1 - decay * 0.005) ** theta;
      return [x, y];
    });

    ctx.beginPath();
    line.context(ctx)(data);
    ctx.stroke();
  }

  function init() {
    ctx = document.querySelector('canvas').getContext('2d');
    canvasContainer = document.querySelector('.canvasContainer');
    size = window.innerHeight < canvasContainer.offsetWidth ? window.innerHeight : canvasContainer.offsetWidth;
    size -= 40; // Account for padding

    const canvas = document.querySelector('canvas');
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';

    const dpr = window.devicePixelRatio;
    canvas.width = size * dpr;
    canvas.height = size * dpr;

    ctx.scale(dpr, dpr);
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
    ctx.clearRect(0, 0, size, size);
    ctx.lineWidth = settings.lineWidth;
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
