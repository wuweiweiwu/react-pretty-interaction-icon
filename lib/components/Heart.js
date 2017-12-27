import React, { Component } from 'react';
import styled from 'styled-components';
import * as mojs from 'mo-js';
import _ from 'lodash';
import PropTypes from 'prop-types';

import HeartIcon from '../icons/HeartIcon';
import Button from '../elements/Button';

import * as colors from '../styles/colors';
import * as sizes from '../styles/sizes';

class Heart extends Component {

  handleClick = (e) => {
    if (!this._animationTimeline) {
      return;
    }
    this._animationTimeline.replay();
    _.invoke(this.props, 'onClick', e, this.props);
  }

  componentDidMount(){

  }

  render(){
    return (
      <Button
        height='45px'
        width='45px'
      >
        <HeartIcon
          fill='#ff4d4d'
          height='40px'
          width='40px'
        />
      </Button>
    );
  }

}

export default Heart;
