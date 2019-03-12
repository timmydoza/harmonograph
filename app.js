const context = document.querySelector('canvas').getContext('2d');
const canvas = d3
  .select('canvas')
  .attr('width', 500)
  .attr('height', 500);

const rad = d3
  .scaleLinear()
  .domain([0, 180])
  .range([0, Math.PI]);

const x = d3
  .scaleLinear()
  .domain([-2, 2])
  .range([0, 500]);

const y = d3
  .scaleLinear()
  .domain([-2, 2])
  .range([0, 500]);

const xFreq = 2;
const yFreq = 2;

let e = 0;
const base = d3
  .range(0, 3 * 360 * xFreq * yFreq + 1, 2)
  .map((d, i) => [Math.cos(rad(d) / xFreq), Math.sin(rad(d) / yFreq), d]);

const data = base.map(([x, y, d], i) => {
  cos = Math.cos(rad(d)*1),
  sin = Math.sin(rad(d)*1),
  nx = (cos + x),
  ny = (sin + y);
return [nx, ny];
// return [x,y]
});

// const data = d3
//   .range(360 * xFreq * yFreq + 1)
//   .map(d => [Math.sin(rad(d) / xFreq) * Math.sin(rad(d)), Math.sin(rad(d) / yFreq) * Math.cos(rad(d))]);

const line = d3
  .line()
  .x(d => x(d[0]))
  .y(d => y(d[1]));

context.lineWidth = 1;
function update() {
  line.context(context)(data);
  context.stroke();
}

update();

// const circle = svg.append('circle').attr('r', 5);

// transition();

// function transition() {
//   circle
//     .transition()
//     .duration(2000)
//     .ease(d3.easeLinear)
//     .attrTween('transform', translateAlong(path.node()))
//     .on('end', transition);
// }

// function translateAlong(path) {
//   var l = path.getTotalLength();
//   return (d, i, a) => t => {
//     var p = path.getPointAtLength(t * l);
//     return 'translate(' + p.x + ',' + p.y + ')';
//   };
// }
