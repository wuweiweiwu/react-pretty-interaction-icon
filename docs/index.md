
## Components
* [Heart](#Heart)
* [Like](#Like)
* [MediumClap](#MediumClap)
* [Music](#Music)

### Heart

[Demo]()

#### Props

```
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

### MediumClap

### Music
