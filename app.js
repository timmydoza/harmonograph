const context = document.querySelector('canvas').getContext('2d');

const size = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;

const canvas = d3
  .select('canvas')
  .attr('width', size)
  .attr('height', size);

const scale = d3
  .scaleLinear()
  .domain([-2, 2])
  .range([0, size]);

const xFreq = 3;
const yFreq = 2;
const zFreq = 3.01;
const invert = false;
const radial = true;
const speed = 2;

const line = d3
  .line()
  .x(d => scale(d[0]))
  .y(d => scale(d[1]));

function update(min, max) {
  const data = d3.range(min, max).map(d => {
    const theta = (d / 180) * Math.PI;
    let x = Math.cos(theta * xFreq);
    let y = Math.sin(theta * yFreq);

    if (radial) {
      x += Math.cos(theta * zFreq);
      y += Math.sin(theta * zFreq);

      if (invert) {
        x /= zFreq;
        y /= zFreq;
      }
    }

    return [x, y];
  });

  context.beginPath();
  line.context(context)(data);
  context.stroke();
}

let last = 0;
const timer = d3.timer(elapsed => {
  update(last * speed, elapsed * speed + 1);
  last = elapsed;
});