import React, { Component } from "react";
import styled from "styled-components";
import * as mojs from "mo-js";
import _ from "lodash";
import PropTypes from "prop-types";

import { MusicIcon } from "../icons";
import { Button } from "../elements";

import { OneNote, TwoNote } from "../shapes";

import * as colors from "../styles/colors";
import * as sizes from "../styles/sizes";

// randomly choose a color
const randomColor = () =>
  colors[
    Object.keys(colors)[Math.floor(Math.random() * Object.keys(colors).length)]
  ];

class Music extends Component {
  static propTypes = {
    size: PropTypes.oneOf([
      "extraSmall",
      "small",
      "medium",
      "large",
      "extraLarge"
    ]),
    color: PropTypes.string,
    strokeColor: PropTypes.string,

    hasRock: PropTypes.bool,
    hasNotes: PropTypes.bool,

    onClick: PropTypes.func,

    noteColors: function(props, propName, componentName) {
      let noteColors = props[propName];
      if (noteColors === undefined) {
        return null;
      }
      if (!Array.isArray(noteColors)) {
        return new Error("Sorry noteColors must be a array.");
      }
      return noteColors.length <= 4 && noteColors.length >= 0
        ? null
        : new Error("Length must be between 0 and 4");
    }
  };

  static defaultProps = {
    size: "medium",
    color: "silver",
    strokeColor: "black",

    hasRock: false,
    hasNotes: false,

    onClick: null,

    // default is random colors
    noteColors: [randomColor(), randomColor(), randomColor(), randomColor()]
  };

  handleClick = e => {
    if (!this._animationTimeline) {
      return;
    }
    this._animationTimeline.replay();
    _.invoke(this.props, "onClick", e, this.props);
  };

  componentDidMount() {
    const { hasRock, hasNotes, noteColors } = this.props;

    // adding the custom shapes to mojs
    mojs.addShape("oneNote", OneNote);
    mojs.addShape("twoNote", TwoNote);

    const note_opts_two = {
      parent: "#music-button",
      shape: "twoNote",
      scale: {
        5: 20
      },
      y: {
        20: -10
      },
      duration: 3000,
      easing: "sin.out"
    };

    const note_opts_one = {
      parent: "#music-button",
      shape: "oneNote",
      scale: {
        7: 20
      },
      y: {
        20: -10
      },
      duration: 2000,
      easing: "sin.out"
    };

    const note1 = new mojs.ShapeSwirl({
      ...note_opts_two,
      fill: noteColors[0] ? colors[noteColors[0]] : randomColor(),
      opacity: { 1: 0 },
      swirlSize: 15,
      swirlFrequency: 20
    });

    const note2 = new mojs.ShapeSwirl({
      ...note_opts_two,
      x: {
        0: 100
      },
      fill: noteColors[1] ? colors[noteColors[1]] : randomColor(),
      y: {
        20: -30
      },
      opacity: { 1: 0 },
      swirlSize: 15,
      swirlFrequency: 10,
      delay: 100
    });

    const note3 = new mojs.ShapeSwirl({
      ...note_opts_one,
      fill: noteColors[2] ? colors[noteColors[2]] : randomColor(),
      y: {
        20: -70
      },
      opacity: { 1: 0 },
      swirlSize: 20,
      swirlFrequency: 15,
      delay: 200
    });

    const note4 = new mojs.ShapeSwirl({
      ...note_opts_one,
      x: {
        10: -100
      },
      fill: noteColors[3] ? colors[noteColors[3]] : randomColor(),
      y: {
        10: -40
      },
      opacity: { 1: 0 },
      swirlSize: 15,
      swirlFrequency: 12,
      delay: 300
    });

    // rocking the icon
    const musicIcon = document.querySelector("#music-icon");
    const rockingEasing = mojs.easing.path(
      "M0,351S16.7,59.7,64.7,60.3c0,0,25-11,26.3,139.7,1.3,144.3,31.3,129.3,31.3,129.3S159,339,159,200c0-147,37-139.9,37-139.9S226.4,45.7,223.7,200c-2.7,151.2,24.7,128,24.7,128s36.9,10.5,38.7-128c2-153,39.7-140.4,39.7-140.4s36.3-9.9,41,186.1c0,0,.7,110.3,32.3,105.3"
    );
    const jumpEasing = mojs.easing.path(
      "M0,400,77.7,43,117,239,143,77s16,264,42.7,251.3,11.7-379,37.7-315S235,303,257,235.7,281,61.7,285.7,97,305,262.3,311,209.3s25.3-119,34-46.3,55,237,55,237"
    );
    const iconRock = new mojs.Tween({
      repeat: 5,
      duration: 400,
      onUpdate: function(progress) {
        const rockingProgress = rockingEasing(progress);
        const jumpProgress = jumpEasing(progress);
        musicIcon.style.transform = `translateX(${rockingProgress}px) translateY(${0.25 *
          jumpProgress}px)  rotate(${rockingProgress}deg)`;
      }
    });

    const animationTimeline = new mojs.Timeline();

    if (hasNotes) {
      animationTimeline.add([note1, note2, note3, note4]);
    }

    if (hasRock) {
      animationTimeline.add(iconRock);
    }

    this._animationTimeline = animationTimeline;
  }

  render() {
    const { color, size, strokeColor } = this.props;

    // size of button
    const buttonSize =
      parseInt(sizes.square[size].replace("px", "")) + 5 + "px";

    return (
      <Button
        height={buttonSize}
        id="music-button"
        onClick={this.handleClick}
        width={buttonSize}
      >
        <MusicIcon
          fill={colors[color]}
          stroke={colors[strokeColor]}
          height={sizes.square[size]}
          id="music-icon"
          width={sizes.square[size]}
        />
      </Button>
    );
  }
}

export default Music;
