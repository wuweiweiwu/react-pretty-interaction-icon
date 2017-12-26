import React, {Component} from 'react';
import styled from 'styled-components';
import * as mojs from 'mo-js';

import LikeIcon from '../svgs/LikeIcon';

class Like extends Component {

  handleClick = (e) => {
    if (!this._animationTimeline)
    {return;}
    this._animationTimeline.replay();
    _.invoke(this.props, 'onClick', e, this.props);
  }

  componentDidMount() {
    // burst animation
    const burst = new mojs.Burst({
        parent: '#like',
        radius: {
          30: 90
        },
        count: 6,
        children: {
          fill: '#C0C1C3',
          opacity: 0.6,
          radius: 15,
          duration: 1700,
          easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
        }
      })
      // ring animation
      const ring = new mojs.Shape({
          parent: '#like',
          type: 'circle',
          radius: {
            0: 60
          },
          fill: 'transparent',
          stroke: '#C0C1C3',
          strokeWidth: {
            20: 0
          },
          opacity: 0.6,
          duration: 700,
          easing: mojs.easing.sin.out
        })
        // icon scale animation
        const iconScale = new mojs.Tween({
          duration: 1200,
          onUpdate: function(progress) {
            const likeIcon = document.querySelector('#like-icon');
            if (progress > 0.3) {
              const elasticOutProgress = mojs.easing.elastic.out(1.43 * progress - 0.43);
              likeIcon.style.WebkitTransform = likeIcon.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)';
            } else {
              likeIcon.style.WebkitTransform = likeIcon.style.transform = 'scale3d(0,0,1)';
            }
          }
        })

        const animationTimeline = new mojs.Timeline();
        animationTimeline.add([
          burst,
          ring,
          iconScale
        ]);

        this._animationTimeline = animationTimeline;
      }

      render() {
        const LikeButton = styled.button`
          position: relative;
          width: 60px;
          height: 50px;
          background: none;
          border: none;
          outline: none;
          &:hover {
            cursor: pointer;
          }
        `;

        return (
          <LikeButton
            onClick={this.handleClick}
            id='like'>
            <LikeIcon
              id='like-icon'
              width='40px'
              height='40px'
              fill="#8bb2ff"
              stroke='#8bb2ff'
              strokeWidth='2px'/>
        </LikeButton>)
      }

    }

    export default Like;
