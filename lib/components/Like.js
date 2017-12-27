import React, { Component } from 'react';
import styled from 'styled-components';
import * as mojs from 'mo-js';
import _ from 'lodash';
import PropTypes from 'prop-types';

import LikeIcon from '../icons/LikeIcon';
import Button from '../elements/Button';

import * as colors from '../styles/colors';
import * as sizes from '../styles/sizes';

// {from: to} definitions for mojs
const radius = {
  extraSmall: {
    0: 30
  },
  small: {
    10: 50
  },
  medium: {
    30: 60
  },
  large: {
    50: 80
  },
  extraLarge: {
    70: 100
  }
};

const direction = {
  top: {
    angle: -30,
    degree: 60
  },
  right: {
    angle: 60,
    degree: 60
  },
  bottom: {
    angle: 150,
    degree: 60
  },
  left: {
    angle: 240,
    degree: 60
  },
  all: {
    angle: 0,
    degree: 360
  }
};

const points = {
  circle: 0,
  triangle: 3,
  square: 4,
  pentagon: 5,
  hexagon: 6,
  septagon: 7,
  zigzag: 5,
};

class Like extends Component {

  static propTypes = {
    onClick: PropTypes.func,

    // burst properties
    burstShape: PropTypes.oneOf([
      'line',
      'zigzag',
      'cross',
      'equal',
      'circle',
      'triangle',
      'square',
      'pentagon',
      'hexagon',
      'septagon',
    ]),
    burstCount: PropTypes.number,
    burstFillColor: PropTypes.string,
    burstStrokeColor: PropTypes.string,
    burstRadius: PropTypes.string,
    burstDirection: PropTypes.string,
    burstOpacity: function(props, propName, componentName) {
      let opacity = props[propName];

      if (opacity === undefined) {
        return null;
      }

      if (isNaN(opacity)) {
        return new Error("Sorry opacity must be a number.");
      }

      return opacity >= 0 && opacity <= 1 ? null : new Error("Must be within range of 0 to 1");
    },

    // ring properties
    ringColor: PropTypes.string,
    ringRadius: PropTypes.string,
    ringOpacity: function(props, propName, componentName) {
      let opacity = props[propName];

      if (opacity === undefined) {
        return null;
      }

      if (isNaN(opacity)) {
        return new Error("Sorry opacity must be a number.");
      }

      return opacity >= 0 && opacity <= 1 ? null : new Error("Must be within range of 0 to 1");
    },


    // whether to have these animations
    hasRing: PropTypes.bool,
    hasShrink: PropTypes.bool,
    hasBurst: PropTypes.bool,

    // basic compnonent properties
    color: PropTypes.string,
    size: PropTypes.string
  }

  static defaultProps = {
    onClick: null,

    burstShape: 'circle',
    burstCount: 5,
    burstStrokeColor: null,
    burstFillColor: null,
    burstRadius: 'medium',
    burstDirection: 'all',
    burstOpacity: 0.6,

    ringColor: 'darkSnow',
    ringRadius: 'extraSmall',
    ringOpacity: 0.6,

    hasRing: true,
    hasShrink: true,
    hasBurst: true,

    color: 'blue',
    size: 'medium'
  }

  // play the timeline and invoke the prop onClick function
  handleClick = (e) => {
    if (!this._animationTimeline) {
      return;
    }
    this._animationTimeline.replay();
    _.invoke(this.props, 'onClick', e, this.props);
  }

  // create animation after the component has mounted
  componentDidMount() {
    const {
      burstShape,
      burstCount,
      burstStrokeColor,
      burstFillColor,
      burstRadius,
      burstDirection,
      burstOpacity,

      ringColor,
      ringRadius,
      ringOpacity,

      hasRing,
      hasShrink,
      hasBurst
    } = this.props;

    const shape = burstShape === 'circle' || burstShape === 'line' ||
                  burstShape === 'zigzag' || burstShape === 'cross' ||
                  burstShape === 'equal'? burstShape : 'polygon';

    // burst animation
    const burst = new mojs.Burst({
      parent: '#like',
      radius: radius[burstRadius],
      count: burstCount,
      angle: direction[burstDirection]['angle'],
      degree: direction[burstDirection]['degree'],
      children: {
        shape,
        points: points[burstShape],
        fill: burstFillColor ? colors[burstFillColor] : 'transparent',
        opacity: burstOpacity,
        radius: 15,
        duration: 1700,
        strokeWidth: 2,
        stroke: burstStrokeColor ? colors[burstStrokeColor] : 'transparent',
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
      }
    });
    // ring animation
    const ring = new mojs.Shape({
      parent: '#like',
      type: 'circle',
      radius: radius[ringRadius],
      fill: 'transparent',
      stroke: colors[ringColor],
      strokeWidth: {
        20: 0
      },
      opacity: ringOpacity,
      duration: 700,
      easing: mojs.easing.sin.out
    });

    // icon scale animation
    const iconScale = new mojs.Tween({
      duration: 1100,
      onUpdate: function(progress) {
        const likeIcon = document.querySelector('#like-icon');
        if (progress > 0.3) {
          const elasticOutProgress = mojs.easing.elastic.out(1.43 * progress - 0.43);
          likeIcon.style.WebkitTransform = likeIcon.style.transform = `scale3d(${elasticOutProgress},${elasticOutProgress},1)`;
        } else {
          likeIcon.style.WebkitTransform = likeIcon.style.transform = 'scale3d(0,0,1)';
        }
      }
    });

    // create the animationTimeline
    const animationTimeline = new mojs.Timeline();
    if (hasBurst)
    {animationTimeline.add(burst);}
    if (hasRing)
    {animationTimeline.add(ring);}
    if (hasShrink)
    {animationTimeline.add(iconScale);}

    // set this class variable to be the timeline
    // (cannot use state to store the timeline)
    this._animationTimeline = animationTimeline;
  }

  render() {
    const {
      color,
      size
    } = this.props;

    return (
      <Button
        height={sizes.square[size] + 5}
        id='like'
        onClick={this.handleClick}
        width={sizes.square[size] + 5}
      >
        <LikeIcon
          fill={colors[color]}
          height={sizes.square[size]}
          id='like-icon'
          stroke={colors[color]}
          strokeWidth='2px'
          width={sizes.square[size]}
        />
      </Button>);
  }

}

export default Like;
