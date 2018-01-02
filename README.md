## Pretty Interaction Icons

This is my attempt to create a npm package containing interaction icons that look cool w mo.js

```
npm install pretty-interaction-icons
```

Inspired by this [Medium post](https://medium.freecodecamp.org/how-i-re-built-the-medium-clap-effect-and-what-i-got-out-of-the-experiment-991672995fdf?source=user_profile---------6----------------)

[DOCS](http://theweiweiwu.com/pretty-interaction-icons/)

Credit to Codrops + Ohans Emmanuel

### Examples

```javascript
import { MediumClap, Like, Music, Heart } from "pretty-interaction-icons";
```

#### MediumClap

```javascript
<MediumClap
  size="medium"
  color="darkGreen"
  labelColor="darkGreen"
  clapCount={0}
  clapCountTotal={10}
/>
```

#### Like

```javascript
<Like
  hasBurst
  hasRing
  hasShrink
  ringColor="purple"
  burstStrokeColor="blue"
  burstRadius="large"
  burstShape="line"
  ringRadius="extraLarge"
  burstCount={5}
  burstOpacity={0.5}
  ringOpacity={0.5}
  size="large"
  labelContent={10}
  labelPosition="bottom"
/>
```

#### Music

```javascript
<Music
  hasNotes
  hasRock
  color="blue"
  noteColors={["danger", "warning", "darkGreen", "warning"]}
/>
```

#### Heart

```javascript
<Heart
  size="large"
  color="danger"
  ringColor="green"
  ringSize="extraLarge"
  hasShrink
  hasRings
  labelContent={10}
  labelPosition="top"
/>
```
