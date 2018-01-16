import React, { Component } from 'react';
import styled from 'styled-components';
import * as mojs from 'mo-js';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { LikeIcon } from '../icons';

import { Button, Label } from '../elements';

import * as colors from '../styles/colors';
import * as sizes from '../styles/sizes';
import * as radius from '../styles/radiuses';
import * as direction from '../styles/directions';
import * as points from '../styles/points';
import * as labelPositionMultipliers from '../styles/labelPositionMultipliers';

/**
 * Like interaction contains a burst and a ring animation
 * also contains a positionable Label for users to input like count
 */
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
    burstRadius: PropTypes.oneOf([
      'extraSmall',
      'small',
      'medium',
      'large',
      'extraLarge',
    ]),
    burstDirection: PropTypes.oneOf(['top', 'left', 'bottom', 'right', 'all']),
    burstOpacity: function(props, propName, componentName) {
      let opacity = props[propName];
      if (opacity === undefined) {
        return null;
      }
      if (isNaN(opacity)) {
        return new Error('Sorry opacity must be a number.');
      }
      return opacity >= 0 && opacity <= 1
        ? null
        : new Error('Must be within range of 0 to 1');
    },

    // ring properties
    ringColor: PropTypes.string,
    ringRadius: PropTypes.oneOf([
      'extraSmall',
      'small',
      'medium',
      'large',
      'extraLarge',
    ]),
    ringOpacity: function(props, propName, componentName) {
      let opacity = props[propName];

      if (opacity === undefined) {
        return null;
      }

      if (isNaN(opacity)) {
        return new Error('Sorry opacity must be a number.');
      }

      return opacity >= 0 && opacity <= 1
        ? null
        : new Error('Must be within range of 0 to 1');
    },

    // whether to have these animations
    hasRing: PropTypes.bool,
    hasShrink: PropTypes.bool,
    hasBurst: PropTypes.bool,
    hasTravel: PropTypes.bool,

    // label properties
    labelContent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    labelPosition: PropTypes.oneOf(['top', 'left', 'bottom', 'right']),
    labelFontColor: PropTypes.string,
    labelFontSize: PropTypes.string,

    // basic compnonent properties
    color: PropTypes.string,
    strokeColor: PropTypes.string,
    size: PropTypes.oneOf([
      'extraSmall',
      'small',
      'medium',
      'large',
      'extraLarge',
    ]),
  };

  static defaultProps = {
    onClick: null,

    burstShape: 'circle',
    burstCount: 5,
    burstStrokeColor: 'darkSnow',
    burstFillColor: null,
    burstRadius: 'medium',
    burstDirection: 'all',
    burstOpacity: 0.6,

    ringColor: 'darkSnow',
    ringRadius: 'small',
    ringOpacity: 0.6,

    hasRing: false,
    hasShrink: false,
    hasBurst: false,
    hasTravel: false,

    labelContent: null,
    labelPosition: 'top',
    labelFontColor: 'silver',
    labelFontSize: '1em',

    color: 'silver',
    strokeColor: 'black',
    size: 'medium',
  };

  // play the timeline and invoke the prop onClick function
  handleClick = e => {
    if (!this._animationTimeline) {
      return;
    }
    this._animationTimeline.replay();
    _.invoke(this.props, 'onClick', e, this.props);
  };

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
      hasBurst,
      hasTravel,
    } = this.props;

    const shape =
      burstShape === 'circle' ||
      burstShape === 'line' ||
      burstShape === 'zigzag' ||
      burstShape === 'cross' ||
      burstShape === 'equal'
        ? burstShape
        : 'polygon';

    // burst animation
    const burst = new mojs.Burst({
      parent: '#like-button',
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
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
      },
    });

    // ring animation
    const ring = new mojs.Shape({
      parent: '#like-button',
      type: 'circle',
      radius: radius[ringRadius],
      fill: 'transparent',
      stroke: colors[ringColor],
      strokeWidth: {
        20: 0,
      },
      opacity: ringOpacity,
      duration: 700,
      easing: mojs.easing.sin.out,
    });

    const likeIcon = document.querySelector('#like-icon');

    // icon scale animation
    const iconScale = new mojs.Tween({
      duration: 1100,
      onUpdate: function(progress) {
        if (progress > 0.3) {
          const elasticOutProgress = mojs.easing.elastic.out(
            1.43 * progress - 0.43
          );
          likeIcon.style.WebkitTransform = likeIcon.style.transform = `scale3d(${elasticOutProgress},${elasticOutProgress},1)`;
        } else {
          likeIcon.style.WebkitTransform = likeIcon.style.transform =
            'scale3d(0,0,1)';
        }
      },
    });

    // icon travel animation
    const iconTravel = new mojs.Tween({
      duration: 1200,
      onUpdate: function(progress) {
        const elasticOutProgress = mojs.easing.elastic.out(progress);
        likeIcon.style.WebkitTransform = likeIcon.style.transform = `translate3d(${-50 *
          (1 - elasticOutProgress)}%,0,0)`;
      },
    });

    // create the animationTimeline
    const animationTimeline = new mojs.Timeline();
    if (hasBurst) {
      animationTimeline.add(burst);
    }
    if (hasRing) {
      animationTimeline.add(ring);
    }
    if (hasShrink) {
      animationTimeline.add(iconScale);
    }
    if (hasTravel) {
      animationTimeline.add(iconTravel);
    }

    // set this class variable to be the timeline
    // (cannot use state to store the timeline)
    this._animationTimeline = animationTimeline;
  }

  // the icon is a SVG nested inside a Button
  // the Label is rendered only if there is content
  render() {
    const {
      color,
      size,
      labelPosition,
      labelContent,
      labelFontSize,
      labelFontColor,
      strokeColor,
    } = this.props;

    // positionings of the label content
    const labelPositionTop =
      parseInt(sizes.square[size].replace('px', '')) *
      labelPositionMultipliers[labelPosition].top;
    const labelPositionLeft =
      parseInt(sizes.square[size].replace('px', '')) *
      labelPositionMultipliers[labelPosition].left;

    // size of button
    const buttonSize =
      parseInt(sizes.square[size].replace('px', '')) + 5 + 'px';

    return (
      <Button
        height={buttonSize}
        id="like-button"
        onClick={this.handleClick}
        width={buttonSize}
      >
        <LikeIcon
          fill={colors[color]}
          height={sizes.square[size]}
          id="like-icon"
          stroke={colors[strokeColor]}
          strokeWidth="15px"
          width={sizes.square[size]}
        />
        {labelContent !== null && (
          <Label
            color={labelFontColor}
            fontSize={labelFontSize}
            left={labelPositionLeft + 'px'}
            textAlign="center"
            top={labelPositionTop + 'px'}
          >
            {labelContent}
          </Label>
        )}
      </Button>
    );
  }
}

export default Like;
