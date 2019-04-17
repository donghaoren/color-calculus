# color-calculus

A zero-dependency library of color conversion functions.

## Supported Color Spaces

- General Color Spaces

  - `lab` ([CIELAB](https://en.wikipedia.org/wiki/CIELAB_color_space#CIELAB) with D50 Illuminant)
  - `hcl` (`lab` in polar coordinates)
  - `xyz` ([CIEXYZ](https://en.wikipedia.org/wiki/CIE_1931_color_space))

- Commonly Used RGB Color Spaces

  - `sRGB`
  - `AdobeRGB`
  - `DisplayP3`
  - `AppleRGB`

- [CIECAM02](https://en.wikipedia.org/wiki/CIECAM02) Perceptual Color Spaces
  - `JCh` (CIECAM02 with D65 Illuminant)
  - `Jab` (CIECAM02 with D65 Illuminant)

## Usage

### Install

```bash
npm install color-calculus
```

### Example

**Recommended method:** import the library with ES module syntax. With this method, you can take advantage of the tree shaking features of a modern packaging tool such as `rollup` or `webpack`.

```js
// Import the desired conversion function
import { xyz_to_lab } from "color-calculus";

// Convert xyz (10, 20, 30) to lab
const [l, a, b] = xyz_to_lab(10, 20, 30);

// Input can be supplied as an array
const lab = xyz_to_lab([10, 20, 30]);
```

**Import with CommonJS syntax:** useful when targeting Node.js:

```js
// Import the desired conversion function
const { xyz_to_lab } = require("color-calculus");
```

**Load via a `script` tag:** useful when writing a simple HTML file:

```html
<script
  src="node_modules/color-calculus/dist/color-calculus.umd.min.js"
  type="text/javascript"
></script>

<script type="text/javascript">
  const xyz_to_lab = ColorCalculus.xyz_to_lab;
</script>
```

The `color-calculus.umd.min.js` has zero dependency, you can copy the file from the `node_modules` folder to a different location and specify the `src` attribute accordingly.

### High-level API

`color-calculus` provides a high-level API to access its colorspace conversion functions.

#### The `Color` class

```js
import { color, Color } from "color-calculus";

// Create a Color instance
var c = color("#1f77b4"); // from HEX string
var c = color("rgb(31,119,180)"); // from CSS string
var c = color("cyan"); // from named color
var c = color(47.4, -8.9, -40.2, "lab"); // from CIELAB values
var c = color([47.4, -8.9, -40.2], "lab"); // from CIELAB values
var c = color(15.4, 16.8, 45.6, "xyz"); // from CIEXYZ values
var c = color([15.4, 16.8, 45.6], "xyz"); // from CIEXYZ values

// Calling the Color constructor has the same effect
var c = new Color([15.4, 16.8, 45.6], "xyz"); // from CIEXYZ values

c instanceof Color; // true

c.alpha(); // 1
c.alpha(0.5); // set alpha to 0.5

c.css(); // 'rgba(31,119,180,0.5)'
c.hex(); // '#1f77b4'
c.lab(), c.to("lab"); // [ 47.4, -8.9, -40.2 ] (approximately)
c.hcl(), c.to("hcl"); // [ 47.4, -8.9, -40.2 ] (approximately)
c.JCh(), c.to("JCh"); // [ 47.4, -8.9, -40.2 ] (approximately)
c.Jab(), c.to("Jab"); // [ 47.4, -8.9, -40.2 ] (approximately)
c.xyz(), c.to("xyz"); // [ 47.4, -8.9, -40.2 ] (approximately)
```

#### The `Scale` class

```js
import { scale, Scale } from "color-calculus";
```

### Conversion Functions

All color conversions are named in the following convention:

```ts
/**
 * Convert from "source" colorspace to "destination" colorspace
 *
 * The parameter can be either three components, or an array of three components.
 * No default value is provided.
 */
source_to_destination(x1: number, x2: number, x3: number): [number, number, number ];
source_to_destination(x: [number, number, number]): [number, number, number];
```

`source` and `destination` can be any of the supported colorspaces, here is a list:

- General Color Spaces

  - `lab` (CIELAB with D50 Illuminant)
  - `hcl` (Polar coordinates of `lab`)
  - `xyz` (CIEXYZ)

- Commonly Used RGB Color Spaces

  - `sRGB`
  - `AdobeRGB`
  - `DisplayP3`
  - `AppleRGB`

- CIECAM02 Perceptual Color Spaces
  - `JCh` (CIECAM02 with D65 Illuminant)

For example, to convert from `sRGB` to `DisplayP3`, you can use `sRGB_to_DisplayP3`.

### Advanced CIECAM02 Functions

The CIECAM02 model captures color consistency. You can use this to convert colors between different viewing conditions.

```js
import { CIECAM02 } from "color-calculus";

// TODO: Example
```

### Derivatives of Conversion Functions

`color-calculus` allows you to compute the derivative (Jacobian) of some of the conversion functions. The derivatives would be useful if you want to do gradient-based optimizations for colors.

A gradient function follows the convention below:

```ts
/**
 * Convert from "source" colorspace to "destination" colorspace
 *
 * The parameter can be either three components, or an array of three components.
 * No default value is provided.
 */
source_to_destination_derivative(x1: number, x2: number, x3: number): [
  [number, number, number],
  [number, number, number],
  [number, number, number]
]
source_to_destination_derivative(x: [number, number, number]): [
  [number, number, number],
  [number, number, number],
  [number, number, number]
]
```

Color conversion functions are multivariate functions. The derivative of a multivariate function is called a Jacobian. `color-calculus`'s derivative functions return Jacobian matrices in the following format:

```
For a color conversion that takes [x1, x2, x3] and outputs [y1, y2, y3],
the Jacobian is returned in this format:

[
  [ dy1/dx1, dy1/dx2, dy1/dx3 ],
  [ dy2/dx1, dy2/dx2, dy2/dx3 ],
  [ dy3/dx1, dy3/dx2, dy3/dx3 ]
]
```

## Development

First, install dependencies with [yarn](https://yarnpkg.com/):

```bash
yarn
```

Build the project:

```bash
yarn build
```

Test the project:

```bash
yarn test
```

## License

MIT.
