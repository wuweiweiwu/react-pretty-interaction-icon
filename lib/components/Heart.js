import React, { Component } from "react";
import styled from "styled-components";
import * as mojs from "mo-js";
import _ from "lodash";
import PropTypes from "prop-types";

import HeartIcon from "../icons/HeartIcon";
import { Button, Label } from "../elements";

import * as colors from "../styles/colors";
import * as sizes from "../styles/sizes";
import * as labelPositionMultipliers from "../styles/labelPositionMultipliers";

// multiplier for the radius of the burst animations
const ringSizeMultiplier = {
  extraSmall: 0.3,
  small: 0.7,
  medium: 1,
  large: 1.3,
  extraLarge: 1.5
};

class Heart extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    color: PropTypes.string,
    strokeColor: PropTypes.string,
    ringColor: PropTypes.string,

    hasRings: PropTypes.bool,
    hasShrink: PropTypes.bool,

    size: PropTypes.oneOf([
      "extraSmall",
      "small",
      "medium",
      "large",
      "extraLarge"
    ]),
    ringSize: PropTypes.oneOf([
      "extraSmall",
      "small",
      "medium",
      "large",
      "extraLarge"
    ]),

    // label properties
    labelContent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    labelPosition: PropTypes.oneOf(["top", "left", "bottom", "right"]),
    labelFontColor: PropTypes.string,
    labelFontSize: PropTypes.string
  };

  static defaultProps = {
    onClick: null,
    color: "danger",
    strokeColor: "danger",
    ringColor: "danger",

    hasRings: false,
    hasShrink: false,

    size: "medium",
    ringSize: "medium",

    labelContent: null,
    labelPosition: "top",
    labelFontColor: "silver",
    labelFontSize: "1em"
  };

  handleClick = e => {
    if (!this._animationTimeline) {
      return;
    }
    // somehow this doesnt work with setState
    this._animationTimeline.replay();
    _.invoke(this.props, "onClick", e, this.props);
  };

  componentDidMount() {
    const { ringColor, hasRings, hasShrink, ringSize } = this.props;

    const multiplier = ringSizeMultiplier[ringSize];

    // ring animations
    const ring1 = new mojs.Shape({
      parent: "#heart-button",
      duration: 750,
      type: "circle",
      radius: {
        0: 30 * multiplier
      },
      fill: "transparent",
      stroke: colors[ringColor],
      strokeWidth: {
        35: 0
      },
      opacity: 0.2,
      top: "45%",
      easing: mojs.easing.bezier(0, 1, 0.5, 1)
    });
    const ring2 = new mojs.Shape({
      parent: "#heart-button",
      duration: 500,
      delay: 100,
      type: "circle",
      radius: {
        0: 15 * multiplier
      },
      fill: "transparent",
      stroke: colors[ringColor],
      strokeWidth: {
        5: 0
      },
      opacity: 0.2,
      x: 30 * multiplier,
      y: -50 * multiplier,
      easing: mojs.easing.sin.out
    });
    const ring3 = new mojs.Shape({
      parent: "#heart-button",
      duration: 500,
      delay: 180,
      type: "circle",
      radius: {
        0: 5 * multiplier
      },
      fill: "transparent",
      stroke: colors[ringColor],
      strokeWidth: {
        5: 0
      },
      opacity: 0.5,
      x: -5 * multiplier,
      y: -60 * multiplier,
      isRunLess: true,
      easing: mojs.easing.sin.out
    });
    const ring4 = new mojs.Shape({
      parent: "#heart-button",
      duration: 800,
      delay: 240,
      type: "circle",
      radius: {
        0: 15 * multiplier
      },
      fill: "transparent",
      stroke: colors[ringColor],
      strokeWidth: {
        5: 0
      },
      opacity: 0.3,
      x: -60 * multiplier,
      y: -5 * multiplier,
      easing: mojs.easing.sin.out
    });
    const ring5 = new mojs.Shape({
      parent: "#heart-button",
      duration: 800,
      delay: 240,
      type: "circle",
      radius: {
        0: 15 * multiplier
      },
      fill: "transparent",
      stroke: colors[ringColor],
      strokeWidth: {
        5: 0
      },
      opacity: 0.4,
      x: 70 * multiplier,
      y: -40 * multiplier,
      easing: mojs.easing.sin.out
    });
    const ring6 = new mojs.Shape({
      parent: "#heart-button",
      duration: 1000,
      delay: 300,
      type: "circle",
      radius: {
        0: 10 * multiplier
      },
      fill: "transparent",
      stroke: colors[ringColor],
      strokeWidth: {
        5: 0
      },
      opacity: 0.2,
      x: 10 * multiplier,
      y: -80 * multiplier,
      easing: mojs.easing.sin.out
    });
    const ring7 = new mojs.Shape({
      parent: "#heart-button",
      duration: 600,
      delay: 330,
      type: "circle",
      radius: {
        0: 20 * multiplier
      },
      fill: "transparent",
      stroke: colors[ringColor],
      strokeWidth: {
        5: 0
      },
      opacity: 0.4,
      x: -30 * multiplier,
      y: -70 * multiplier,
      easing: mojs.easing.sin.out
    });
    // icon scale animation
    const iconShrink = new mojs.Tween({
      duration: 1200,
      easing: mojs.easing.ease.out,
      onUpdate: function(progress) {
        const heartIcon = document.querySelector("#heart-icon");
        if (progress > 0.3) {
          const elasticOutProgress = mojs.easing.elastic.out(
            1.43 * progress - 0.43
          );
          heartIcon.style.WebkitTransform = heartIcon.style.transform = `scale3d(${elasticOutProgress},${elasticOutProgress},1)`;
        } else {
          heartIcon.style.WebkitTransform = heartIcon.style.transform =
            "scale3d(0,0,1)";
        }
      }
    });

    const animationTimeline = new mojs.Timeline();

    if (hasRings) {
      animationTimeline.add([ring1, ring2, ring3, ring4, ring5, ring6, ring7]);
    }

    if (hasShrink) {
      animationTimeline.add(iconShrink);
    }

    this._animationTimeline = animationTimeline;
  }

  render() {
    const {
      color,
      strokeColor,
      size,
      labelPosition,
      labelContent,
      labelFontSize,
      labelFontColor
    } = this.props;

    // positionings of the label content
    const labelPositionTop =
      parseInt(sizes.square[size].replace("px", "")) *
      labelPositionMultipliers[labelPosition].top;
    const labelPositionLeft =
      parseInt(sizes.square[size].replace("px", "")) *
      labelPositionMultipliers[labelPosition].left;

    // size of button
    const buttonSize =
      parseInt(sizes.square[size].replace("px", "")) + 5 + "px";

    return (
      <Button
        height={buttonSize}
        id="heart-button"
        onClick={this.handleClick}
        width={buttonSize}
      >
        <HeartIcon
          stroke={colors[strokeColor]}
          fill={colors[color]}
          id="heart-icon"
          width={sizes.square[size]}
        />
        {labelContent !== null && (
          <Label
            color={labelFontColor}
            fontSize={labelFontSize}
            left={labelPositionLeft + "px"}
            textAlign="center"
            top={labelPositionTop + "px"}
          >
            {labelContent}
          </Label>
        )}
      </Button>
    );
  }
}

export default Heart;
