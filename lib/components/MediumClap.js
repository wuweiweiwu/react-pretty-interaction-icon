import React, {Component} from 'react';
import styled from 'styled-components';
import Clap from '../svgs/Clap';

class MediumClap extends Component {

  render(){
    const ClapButton = styled.button`
      position: relative;
      outline: 1px solid transparent;
      border-radius: 50%;
      border: 1px solid #bdc3c7;
      width: 80px;
      height: 80px;
      background: none;
      .clap:hover {
        cursor: pointer;
        border: 1px solid #27ae60;
        transition: border-color 0.3s ease-in;
      }
      .clap:hover:after {
        animation: shockwave 1s ease-in infinite;
      }
    `;

    return(
      <ClapButton>
        <Clap/>
      </ClapButton>
    )
  }

}

export default MediumClap;
