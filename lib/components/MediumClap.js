import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import _ from 'lodash';
import PropTypes from 'prop-types';
import * as mojs from 'mo-js';

import ClapIcon from '../svgs/ClapIcon';

class MediumClap extends Component {

  static propTypes = {
    clapCount: PropTypes.number,
    clapCountTotal: PropTypes.number,
    // define value updates in this function (count updates)
    onClick: PropTypes.func,
    duration: PropTypes.number
  }

  static defaultProps = {
    clapCount: 0,
    clapCountTotal: 0,
    onClick: null,
    duration: 300
  }

  handleClick = (e) => {
    if (!this._animationTimeline) {
      return;
    }
    this._animationTimeline.replay();
    _.invoke(this.props, 'onClick', e, this.props);
  }

  componentDidMount() {
    // animation stuff
    // need to wait till component mounted to create mojs animations
    const { duration } = this.props;

    const triangleBurst = new mojs.Burst({
      parent: '#clap',
      radius: {
        50: 95
      },
      count: 5,
      angle: 30,
      children: {
        shape: 'polygon',
        radius: {
          8: 0
        },
        scale: 1,
        stroke: 'rgba(211,84,0 ,0.5)',
        strokeWidth: 2,
        angle: 210,
        delay: 30,
        speed: 0.2,
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
        duration: duration
      }
    });
    const circleBurst = new mojs.Burst({
      parent: '#clap',
      radius: {
        50: 75
      },
      angle: 25,
      duration: duration,
      children: {
        shape: 'circle',
        fill: 'rgba(149,165,166 ,0.5)',
        delay: 30,
        speed: 0.2,
        radius: {
          5: 0
        },
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
      }
    });
    const countAnimation = new mojs.Html({
      el: '#clap-count',
      isShowStart: false,
      isShowEnd: true,
      y: {
        0: -30
      },
      opacity: {
        0: 1
      },
      duration: duration
    }).then({
      opacity: {
        1: 0
      },
      y: -80,
      delay: duration / 2
    });
    const countTotalAnimation = new mojs.Html({
      el: '#clap-count-total',
      isShowStart: false,
      isShowEnd: true,
      opacity: {
        0: 1
      },
      delay: 3 *(duration) / 2,
      duration: duration,
      y: {
        0: -3
      }
    });
    const scaleButton = new mojs.Html({
      el: '#clap',
      duration: duration,
      scale: {
        1.3: 1
      },
      easing: mojs.easing.out
    });

    // preventing the button to be big
    document.querySelector('#clap').style.transform = "scale(1, 1)";

    const animationTimeline = new mojs.Timeline();
    animationTimeline.add([
      triangleBurst,
      circleBurst,
      countAnimation,
      countTotalAnimation,
      scaleButton]);

    this._animationTimeline = animationTimeline;
  }

  render() {
    const { clapCount, clapCountTotal } = this.props;

    const shockwave = keyframes `
      from {
        transform: scale(1);
        box-shadow: 0 0 2px #27ae60;
        opacity: 1;
      }
      to {
        transform: scale(1);
        box-shadow: 0 0 50px #145b32, inset 0 0 10px #27ae60;
        opacity: 0;
      }
    `;

    const ClapButton = styled.button `
      position: relative;
      outline: 1px solid transparent;
      border-radius: 50%;
      border: 1px solid #bdc3c7;
      width: 80px;
      height: 80px;
      background: none;
      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        border-radius: 50%;
        width: 79px;
        height: 79px;
      }
      &:hover {
        cursor: pointer;
        border: 1px solid #27ae60;
        transition: border-color 0.3s ease-in;
      }
      &:hover:after {
        animation: ${shockwave} 1s ease-in infinite;
      }
    `;

    const ClapCount = styled.span `
      position: absolute;
      top: -50px;
      left: 20px;
      font-size: 0.8rem;
      color: white;
      background: #27ae60;
      border-radius: 50%;
      height: 40px;
      width: 40px;
      line-height: 40px;
    `;

    const ClapCountTotal = styled.span `
      position: absolute;
      font-size: 0.8rem;
      width: 80px;
      text-align: center;
      left: 0;
      top: -22.8571428571px;
      color: #bdc3c7;
    `;

    return (
      <ClapButton
        id='clap'
        onClick={this.handleClick}
      >
        <ClapIcon
          fill="#27ae60"
          stroke='#27ae60'
          strokeWidth='2px'
          width='40px'
        />
        <ClapCount id='clap-count'>{clapCount}</ClapCount>
        <ClapCountTotal id='clap-count-total'>{clapCountTotal}</ClapCountTotal>
      </ClapButton>);
  }

}

export default MediumClap;
