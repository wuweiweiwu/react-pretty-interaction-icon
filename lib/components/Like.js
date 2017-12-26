import React, { Component } from 'react';
import styled from 'styled-components';

import LikeIcon from '../svgs/LikeIcon';

class Like extends Component {

  render(){
    return (
      <LikeIcon
        width='40px'
        fill="#8bb2ff"
        stroke='#8bb2ff'
        strokeWidth='2px'
      />
    )
  }

}

export default Like;
