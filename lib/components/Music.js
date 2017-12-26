import React, { Component } from 'react';
import styled from 'styled-components';
import * as mojs from 'mo-js';
import PropTypes from 'prop-types';

import MusicIcon from '../svgs/MusicIcon';
import * as colors from '../styles/colors';
import * as sizes from '../styles/sizes';

class Music extends Component {

  render() {
    return (
      <MusicIcon
        height='40px'
        width='40px'
      />
    )
  }

}

export default Music;
