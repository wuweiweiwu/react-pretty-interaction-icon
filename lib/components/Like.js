import React, { Component } from 'react';
import styled from 'styled-components';
import * as mojs from 'mo-js';
import PropTypes from 'prop-types';

import LikeIcon from '../svgs/LikeIcon';
import * as colors from '../styles/colors';

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
  left: {
    angle: 60,
    degree: 60
  },
  bottom: {
    angle: 150,
    degree: 60
  },
  right: {
    angle: 240,
    degree: 60
  },
  all: {
    angle: 0,
    degree: 360
  }
};

class Like extends Component {

  static propTypes = {
    onClick: PropTypes.func,

    // burst properties
    burstShape: PropTypes.oneOf([
      'circle',
      'rect',
      'polygon',
      'line',
      'cross',
      'equal',
      'curve'
    ]),
    burstCount: PropTypes.number,
    burstColor: PropTypes.string,
    burstRadius: PropTypes.string,
    burstDirection: PropTypes.string,

    // ring properties
    ringColor: PropTypes.string,
    ringRadius: PropTypes.string,

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
    burstColor: 'darkSnow',
    burstRadius: 'medium',
    burstDirection: 'all',

    ringColor: 'darkSnow',
    ringRadius: 'extraSmall',

    hasRing: true,
    hasShrink: true,
    hasBurst: true,

    color: 'lightBlue'
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
      burstColor,
      burstRadius,
      burstDirection,
      ringColor,
      ringRadius,
      hasRing,
      hasShrink,
      hasBurst
    } = this.props;

    // burst animation
    const burst = new mojs.Burst({
      parent: '#like',
      radius: radius[burstRadius],
      count: burstCount,
      angle: direction[burstDirection]['angle'],
      degree: direction[burstDirection]['degree'],
      children: {
        shape: burstShape,
        fill: colors[burstColor],
        opacity: 0.6,
        radius: 15,
        duration: 1700,
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
      opacity: 0.6,
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
          likeIcon.style.WebkitTransform = likeIcon.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)';
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
    const LikeButton = styled.button `
      position: relative;
      width: 60px;
      height: 50px;
      background: none;
      border: none;
      outline: none;
      &:hover {
        cursor: pointer;
      }
    `;

    return (
      <LikeButton
        id='like'
        onClick={this.handleClick}
      >
        <LikeIcon
          fill="#8bb2ff"
          height='40px'
          id='like-icon'
          stroke='#8bb2ff'
          strokeWidth='2px'
          width='40px'
        />
      </LikeButton>);
  }

}

export default Like;
