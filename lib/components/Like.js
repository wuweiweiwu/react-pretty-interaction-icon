import React, {Component} from 'react';
import styled from 'styled-components';
import * as mojs from 'mo-js';
import PropTypes from 'prop-types';

import LikeIcon from '../svgs/LikeIcon';

const iconSizes = {
  small: {
    'font-size': '14px',
    'line-height': '30px',
    padding: '0 8px',
  },
  medium: {
    'font-size': '16px',
    'line-height': '40px',
    padding: '0 12px',
  },
  large: {
    'font-size': '18px',
    'line-height': '50px',
    padding: '0 16px',
  },
  wide: {
    'font-size': '16px',
    'line-height': '40px',
    padding: '0 36px',
  },
  extraWide: {
    'font-size': '16px',
    'line-height': '40px',
    padding: '0 72px',
  },
  fullWidth: {
    'font-size': '16px',
    'line-height': '40px',
    padding: '0 8px',
  },
};

class Like extends Component {

  static propTypes = {
    onClick: PropTypes.func,

    // burst properties
    burstShape: PropTypes.string,
    burstCount: PropTypes.string,
    burstColor: PropTypes.string,
    burstRadius: PropTypes.number,
    burstDirection: PropTypes.string,

    // ring properties
    ringColor: PropTypes.string,
    ringRadius: PropTypes.number,

    // whether to have these animations
    ring: PropTypes.bool,
    shrink: PropTypes.bool,
    burst: PropTypes.bool,

    // basic compnonent properties
    color: PropTypes.string,
    size: PropTypes.string,
  }

  static defaultProps = {
    onClick: null
  }

  handleClick = (e) => {
    if (!this._animationTimeline)
    {return;}
    this._animationTimeline.replay();
    _.invoke(this.props, 'onClick', e, this.props);
  }

  componentDidMount() {
    // burst animation
    const burst = new mojs.Burst({
        parent: '#like',
        radius: {
          30: 90
        },
        count: 6,
        // angle: -30,
        // degree: 60,
        children: {
          fill: '#C0C1C3',
          opacity: 0.6,
          radius: 15,
          duration: 1700,
          easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
        }
      })
      // ring animation
      const ring = new mojs.Shape({
          parent: '#like',
          type: 'circle',
          radius: {
            0: 60
          },
          fill: 'transparent',
          stroke: '#C0C1C3',
          strokeWidth: {
            20: 0
          },
          opacity: 0.6,
          duration: 700,
          easing: mojs.easing.sin.out
        })
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
        })

        const animationTimeline = new mojs.Timeline();
        animationTimeline.add([
          burst,
          ring,
          iconScale
        ]);

        this._animationTimeline = animationTimeline;
      }

      render() {
        const LikeButton = styled.button`
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
            onClick={this.handleClick}
            id='like'>
            <LikeIcon
              id='like-icon'
              width='40px'
              height='40px'
              fill="#8bb2ff"
              stroke='#8bb2ff'
              strokeWidth='2px'/>
        </LikeButton>)
      }

    }

    export default Like;
