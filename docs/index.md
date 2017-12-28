Micro-interaction icons for ReactJS using mo.js

[Demo with editable React code]()

## Components
* [Heart](#heart)
* [Like](#like)
* [MediumClap](#mediumclap)
* [Music](#music)

### Heart

#### Props

```javascript
// function to be executed when this icon is clicked
onClick: PropTypes.func,

// fill color of the svg
color: PropTypes.string,

// stroke color of the svg
strokeColor: PropTypes.string,

// color of the ring animation
ringColor: PropTypes.string,

// do you want these animations to play?
hasRings: PropTypes.bool,
hasShrink: PropTypes.bool,

// size of the svg defined by 8pt grid system
size: PropTypes.oneOf([
  'extraSmall',
  'small',
  'medium',
  'large',
  'extraLarge'
]),

// size of the ring animation
// (distance from icon and ring radius)
ringSize: PropTypes.oneOf([
  'extraSmall',
  'small',
  'medium',
  'large',
  'extraLarge'
]),

// label properties
// the content of the label, such as count
// label will not be rendered if this prop is not passed
labelContent: PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
]),

// position of the label relative to the svg
labelPosition: PropTypes.oneOf([
  'top',
  'left',
  'bottom',
  'right'
]),

// color of the label font
labelFontColor: PropTypes.string,

// size of the label font
labelFontSize: PropTypes.string,
```

### Like

#### Props

```javascript
// function to be executed when this icon is clicked
onClick: PropTypes.func,

// shapes spit out by the burst animation
burstShape: PropTypes.oneOf([
  'line',
  'zigzag',
  'cross',
  'equal',
  'circle',
  'triangle',
  'square',
  'pentagon',
  'hexagon',
  'septagon',
]),

// number of burst items
burstCount: PropTypes.number,

// burst item fill color
burstFillColor: PropTypes.string,

// burst item stroke color
burstStrokeColor: PropTypes.string,

// radius of the burst from svg icon
burstRadius: PropTypes.oneOf([
  'extraSmall',
  'small',
  'medium',
  'large',
  'extraLarge',
]),

// direction of the burst
burstDirection: PropTypes.oneOf([
  'top',
  'left',
  'bottom',
  'right',
  'all',
]),

// opacity of burst items (between 0-1)
burstOpacity: PropTypes.number,

// ring properties
// color of the ring animation
ringColor: PropTypes.string,

// radius of the ring from the svg icon
ringRadius: PropTypes.oneOf([
  'extraSmall',
  'small',
  'medium',
  'large',
  'extraLarge'
]),

// opacity of burst items (between 0-1)
ringOpacity: PropTypes.number,

// whether to have these animations
hasRing: PropTypes.bool,
hasShrink: PropTypes.bool,
hasBurst: PropTypes.bool,
hasTravel: PropTypes.bool,

// label properties
// content of the label
labelContent: PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
]),

// position of the label relative to the svg icon
labelPosition: PropTypes.oneOf([
  'top',
  'left',
  'bottom',
  'right'
]),

// color of the label font
labelFontColor: PropTypes.string,

// size of the label font
labelFontSize: PropTypes.string,

// basic compnonent properties
// fill of the svg icon
color: PropTypes.string,

// outline of the svg icon
strokeColor: PropTypes.string,

// size of the svg icon
size: PropTypes.oneOf([
  'extraSmall',
  'small',
  'medium',
  'large',
  'extraLarge'
]),
```

### MediumClap

#### Props

```javascript
// current clap count to be shown
clapCount: PropTypes.number,

// total number of claps
clapCountTotal: PropTypes.number,

// define value updates in this function (count updates)
onClick: PropTypes.func,

// duration of animation
duration: PropTypes.number
```

### Music

#### Props

```javascript
// size of the svg icon
size: PropTypes.oneOf([
  'extraSmall',
  'small',
  'medium',
  'large',
  'extraLarge'
]),

// fill of the svg icon
color: PropTypes.string,

// outline fo the svg icon
strokeColor: PropTypes.string,

// do you want these animations?
hasRock: PropTypes.bool,
hasNotes: PropTypes.bool,

// click function prop
onClick: PropTypes.func,

// note colors Array
// length between 0 and 4 inclusive
// less than 4 that color will be randomly chosen from the palette
noteColors: [null, null, null, null]
```
