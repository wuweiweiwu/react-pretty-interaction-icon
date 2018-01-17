/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const feather = require('feather-icons');
const classNames = require('classnames');

import styles from './react-pretty-interaction-icons.scss';
import animate from 'animate.css/animate.min.css';

// curried util functions
import { objectContainsKey, getObjectValue } from './utils/generic-utils';
const isValidIcon = objectContainsKey(feather.icons);
const getAnimationClass = getObjectValue(animate);

class ReactPrettyInteractionIcon extends Component {
  componentDidMount() {
    // get all the icons rendered
    feather.replace();
  }

  render() {
    const { icon, cssAnimation, cssInfinite, start, ...attrs } = this.props;

    return (
      <span
        className={classNames(
          styles.pii,
          animate.animated,
          !cssInfinite || animate.infinite,
          !start || getAnimationClass(cssAnimation)
        )}
      >
        <i
          data-feather={icon}
          {...attrs}
        />
      </span>
    );
  }
}

ReactPrettyInteractionIcon.propTypes = {
  // specifying which feather icon to use
  icon: function(props, propName, componentName) {
    if (!isValidIcon(props[propName])) {
      return new Error(
        'Invalid prop `' +
          propName +
          '` supplied to' +
          ' `' +
          componentName +
          '`. Invalid icon.'
      );
    }
  },

  // animate.css animation
  cssAnimation: PropTypes.string,
  cssInfinite: PropTypes.bool,

  // when do we start animating,
  start: PropTypes.bool,
};

ReactPrettyInteractionIcon.defaultProps = {
  cssAnimation: [],
  cssInfinite: true,
  start: false,
};

export { ReactPrettyInteractionIcon as PrettyInteractionIcon };
