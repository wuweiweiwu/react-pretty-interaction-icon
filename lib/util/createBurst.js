import * as mojs from 'mo-js';

const createBurst = ({
  parent,
  radius,
  count,
  angle,
  degree,

  // children
  shape,
  points,
  fill,
  opacity,
  stroke,
  strokeWidth,
  opacity,
  duration
}) = new mojs.Burst({
  parent,
  radius,
  count,
  angle,
  degree,
  children: {
    easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
    shape,
    points,
    fill,
    opacity,
    stroke,
    strokeWidth,
    opacity,
    duration
  }
});

export default createBurst;

// const burst = new mojs.Burst({
//   parent: '#like-button',
//   radius: radius[burstRadius],
//   count: burstCount,
//   angle: direction[burstDirection]['angle'],
//   degree: direction[burstDirection]['degree'],
//   children: {
//     shape,
//     points: points[burstShape],
//     fill: burstFillColor ? colors[burstFillColor] : 'transparent',
//     opacity: burstOpacity,
//     radius: 15,
//     duration: 1700,
//     strokeWidth: 2,
//     stroke: burstStrokeColor ? colors[burstStrokeColor] : 'transparent',
//     easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
//   }
// });
