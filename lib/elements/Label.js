import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class Label extends Component {

    static propTypes = {
      top: PropTypes.string.isRequired,
      left: PropTypes.string.isRequired,
      fontSize: PropTypes.string.isRequired,
      
      height: PropTypes.string,
      width: PropTypes.string,
      textAlign: PropTypes.string,
      color: PropTypes.string,
      background: PropTypes.string,
      lineHeight: PropTypes.string,
      borderRadius: PropTypes.string,
    }

    render(){
      const {
        top,
        left,
        fontSize,
        height,
        width,
        textAlign,
        color,
        background,
        lineHeight,
        borderRadius
      } = this.props;

      const LabelBase = styled.span`
        position: absolute;
        font-size: ${fontSize};
        height: ${height}
        width: ${width};
        text-align: ${textAlign ? textAlign : 'left'};
        left: ${left};
        top: ${top};
        color: ${color ? color : 'none'};
        background: ${background ? background : 'none'};
        line-height: ${lineHeight ? lineHeight : '100%'};
        border-radius: ${borderRadius ? borderRadius : '0'}
      `;

      return (
        <LabelBase
          {...this.props}
        />
      );
    }
}

export default Label;
