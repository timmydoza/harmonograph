function Harmonograph() {
  let ctx, size, scale, timer, settings, line;

  function init(_settings) {
    settings = _settings;
    ctx = document.querySelector('canvas').getContext('2d');
    canvasContainer = document.querySelector('.canvasContainer');
    size = window.innerHeight < canvasContainer.offsetWidth ? window.innerHeight : canvasContainer.offsetWidth;

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

  function update(min, max) {
    let { xFreq, yFreq, rotaryFreq, type, invert, rotaryType, decay, size, phase, fade } = settings;
    let inv = invert ? rotaryFreq : 1;
    const range = d3.range(min, max, 0.5);
    const data = range.map(d => {
      const theta = (d / 180) * Math.PI;

      let x = Math[phase === 'open' ? 'cos' : 'sin'](theta * xFreq);
      let y = Math.sin(theta * yFreq);

      if (type === 'rotary') {
        x += (Math.cos(theta * rotaryFreq) / inv) * (rotaryType === 'countercurrent' ? -1 : 1);
        y += Math.sin(theta * rotaryFreq) / inv;
      }

      x *= (1 - decay * 0.005) ** theta;
      y *= (1 - decay * 0.005) ** theta;

      x *= size - 0.02;
      y *= size - 0.02;

      return [x, y];
    });

    ctx.lineWidth = settings.lineWidth * (1 - fade * 0.0001) ** min;
    ctx.beginPath();
    line.context(ctx)(data);
    ctx.stroke();

    return range[range.length - 1];
  }

  function startAnimation() {
    timer && timer.stop();
    ctx.clearRect(0, 0, size, size);
    ctx.strokeStyle = settings.darkMode ? '#fff' : '#000';
    let last = 0;
    timer = window.t = d3.timer(elapsed => {
      last = update(last, elapsed * settings.speed);
    });
  }

  function applySettings(_) {
    settings = _;
  }

  return { init, startAnimation, applySettings };
}
