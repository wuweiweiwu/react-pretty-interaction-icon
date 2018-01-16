/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getReactIcon } from './utils/react-icons-utils';

class ReactPrettyInteractionIcon extends Component {
  render() {
    const { icon } = this.props;

    const Icon = getReactIcon(icon);

    return <Icon />;
  }
}

ReactPrettyInteractionIcon.propTypes = {
  // specifying which icon from React Icons to use
  // fa/amazon, fa/500px, etc
  icon: PropTypes.string.isRequired,
};

ReactPrettyInteractionIcon.defaultProps = {};

export { ReactPrettyInteractionIcon as PrettyInteractionIcon };
