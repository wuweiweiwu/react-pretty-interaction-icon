import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

class Button extends Component {
  static propTypes = {
    height: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired
  };

  render() {
    const { height, width } = this.props;

    const ButtonBase = styled.button`
      position: relative;
      width: ${width};
      height: ${height};
      background: none;
      border: none;
      outline: none;
      &:hover {
        cursor: pointer;
      }
      & * {
        pointer-events: none;
      }
    `;
    return <ButtonBase {...this.props} />;
  }
}

export default Button;
