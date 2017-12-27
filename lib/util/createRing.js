import * as mojs from 'mo-js';

const createRing = ({
  parent,
  radius,
  stroke,
  strokeWidth,
  opacity,
  duration
}) => new mojs.Shape({
  type: 'circle',
  fill: 'transparent',
  easing: mojs.easing.sin.out,
  parent,
  radius,
  stroke,
  strokeWidth,
  opacity,
  duration
});

export default createRing;

// const Ring = new mojs.Shape({
//   parent: '#like-button',
//   type: 'circle',
//   radius: radius[ringRadius],
//   fill: 'transparent',
//   stroke: colors[ringColor],
//   strokeWidth: {
//     20: 0
//   },
//   opacity: ringOpacity,
//   duration: 700,
//   easing: mojs.easing.sin.out
// });
