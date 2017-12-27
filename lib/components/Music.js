import React, {Component} from 'react';
import styled from 'styled-components';
import * as mojs from 'mo-js';
import PropTypes from 'prop-types';

import MusicIcon from '../svgs/MusicIcon';
import OneNote from '../shapes/OneNote';
import TwoNote from '../shapes/TwoNote';

import * as colors from '../styles/colors';
import * as sizes from '../styles/sizes';

class Music extends Component {

  static propTypes = {}

  static defaultProps = {}

  handleClick = (e) => {
    if (!this._animationTimeline) {
      return;
    }
    this._animationTimeline.replay();
    _.invoke(this.props, 'onClick', e, this.props);
  }

  componentDidMount() {
    // adding the custom shapes to mojs
    mojs.addShape('oneNote', OneNote);
    mojs.addShape('twoNote', TwoNote);

    const color1 = '#81daef',
      color2 = '#6dbc99',
      color3 = '#f4a86e';

    const note_opts_two = {
      parent: '#music',
      shape: 'twoNote',
      scale: {
        5: 20
      },
      y: {
        20: -10
      },
      duration: 3000,
      easing: 'sin.out'
    };

    // now it is avaliable to use on mo.js Shape constructor
    const note_opts_one = {
      parent: '#music',
      shape: 'oneNote',
      scale: {
        7: 20
      },
      y: {
        20: -10
      },
      duration: 2000,
      easing: 'sin.out'
    };

    const note1 = new mojs.ShapeSwirl({
      ...note_opts_two,
      fill: {
        'cyan': color2
      },
      opacity: {1: 0},
      swirlSize: 15,
      swirlFrequency: 20
    });

    const note2 = new mojs.ShapeSwirl({
      ...note_opts_two,
      x: {
        0: 100
      },
      fill: {
        'cyan': color3
      },
      y: {
        20: -30
      },
      opacity: {1: 0},
      swirlSize: 15,
      swirlFrequency: 10,
      delay: 100
    });

    const note3 = new mojs.ShapeSwirl({
      ...note_opts_one,
      fill: color1,
      y: {
        20: -70
      },
      opacity: {1: 0},
      swirlSize: 20,
      swirlFrequency: 15,
      delay: 200
    });

    const note4 = new mojs.ShapeSwirl({
      ...note_opts_one,
      x: {
        10: -100
      },
      fill: {
        'cyan': '#9398f9'
      },
      y: {
        10: -40
      },
      opacity: {1: 0},
      swirlSize: 15,
      swirlFrequency: 12,
      delay: 300
    });

    const animationTimeline = new mojs.Timeline();

    animationTimeline.add([
      note1,
      note2,
      note3,
      note4
    ]);

    this._animationTimeline = animationTimeline;
  }

  render() {
    const MusicButton = styled.button `
      position: relative;
      width: 40px;
      height: 40px;
      background: none;
      border: none;
      outline: none;
      &:hover {
        cursor: pointer;
      }
    `;

    return (
      <MusicButton
        id='music'
        onClick={this.handleClick}>
        <MusicIcon
          id='music-icon'
          height='40px'
          width='40px'/>
    </MusicButton>)
  }

}

export default Music;
