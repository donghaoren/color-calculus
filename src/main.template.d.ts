export const version: string;

export type ColorConverter = {
  (c1: number, c2: number, c3: number): [number, number, number];
  (c: number[]): [number, number, number];
};

export type ColorConverterDerivative = {
  (c1: number, c2: number, c3: number): number[][];
  (c: number[]): number[][];
};

// [GENERATED_CODE]

export interface RGBModelFunctions {
  RGB_to_xyz(r: number, g: number, b: number): [number, number, number];
  RGB_to_xyz_derivative(
    r: number,
    g: number,
    b: number
  ): [number, number, number];
  xyz_to_RGB(x: number, y: number, z: number): [number, number, number];
  xyz_to_RGB_derivative(
    x: number,
    y: number,
    z: number
  ): [number, number, number];
}

export interface RGBModelOptions {
  matrix: number[][];
  matrixInverse: number[][];
  fx: {
    gamma: number;
    a: number;
    b: number;
    c: number;
    d: number;
  };
}

export function RGBModel(options: RGBModelOptions): RGBModelFunctions;

export interface CIECAM02ModelCorrelates {
  J: number;
  C: number;
  h: number;
  H: number;
  Q: number;
  M: number;
  s: number;
  ac: number;
  bc: number;
  am: number;
  bm: number;
  as: number;
  bs: number;
}

export interface CIECAM02ModelFunctions {
  xyz_to_JCh(x: number, y: number, z: number): [number, number, number];
  JCh_to_xyz(J: number, C: number, h: number): [number, number, number];
  Jab_to_xyz(J: number, a: number, b: number): [number, number, number];
  xyz_to_Jab(x: number, y: number, z: number): [number, number, number];
  JCh_to_Jab(J: number, C: number, h: number): [number, number, number];
  Jab_to_JCh(J: number, a: number, b: number): [number, number, number];
  JCh_to_correlates(J: number, C: number, h: number): CIECAM02ModelCorrelates;
}

export function CIECAM02Model(
  Xw: number,
  Yw: number,
  Zw: number,
  LA: number,
  Yb: number,
  surround: "average" | "dark" | "dim"
): CIECAM02ModelFunctions;

/** Get a color converter function by source and target colorspaces */
export function converter(source: string, target: string): ColorConverter;

/**
 * Get the derivative (Jacobian) of a color converter function by source
 * and target colorspaces
 */
export function converter_derivative(
  source: string,
  target: string
): ColorConverterDerivative;

export class Color {
  /** Copy a color */
  constructor(c: Color);
  /** Create color from css color string, e.g., #1f77b4 */
  constructor(cssColor: string);
  /**
   * Create color from components
   * @param x - The color components
   * @param [colorspace="sRGB"] - The colorspace
   */
  constructor(x: number[], colorspace?: string);
  /**
   * Create color from components
   * @param x1 - The 1st color component
   * @param x2 - The 2nd color component
   * @param x3 - The 3rd color component
   * @param [colorspace="sRGB"] - The colorspace
   */
  constructor(x1: number, x2: number, x3: number, colorspace?: string);

  /**
   * Represent the color in another colorspace
   * @param [colorspace="sRGB"] - The colorspace
   */
  to(colorspace?: string): [number, number, number];
  /**
   * Represent the color in another colorspace
   * @param [colorspace="sRGB"] - The colorspace
   * @param [repr=null] - The representation of the returned value
   */
  to(colorspace?: string, repr?: "css" | "hex" | "gl"): string;

  /** Represent the color in lab */
  lab(): [number, number, number];
  /** Represent the color in hcl */
  hcl(): [number, number, number];
  /** Represent the color in Jab */
  Jab(): [number, number, number];
  /** Represent the color in JCh */
  JCh(): [number, number, number];
  /** Represent the color in xyz */
  xyz(): [number, number, number];

  /**
   * Convert to css color representation
   * @param [colorspace="sRGB"] - The colorspace
   */
  css(colorspace?: string): string;

  /**
   * Convert to hex color representation (alpha will be discarded)
   * @param [colorspace="sRGB"] - The colorspace
   */
  hex(colorspace?: string): string;

  /**
   * Convert to WebGL color, i.e., an array of 3 components
   * @param [colorspace="sRGB"] - The colorspace
   */
  gl(colorspace?: string): [number, number, number];

  /**
   * Convert to hex color representation (alpha will be discarded)
   * @param [colorspace="sRGB"] - The colorspace
   */
  toString(colorspace?: string): string;
}

/** Copy a color */
export function color(c: Color): Color;
/** Create color from css color string, e.g., #1f77b4 */
export function color(cssColor: string): Color;
/**
 * Create color from components
 * @param x - The color components
 * @param [colorspace="sRGB"] - The colorspace
 */
export function color(x: number[], colorspace?: string): Color;
/**
 * Create color from components
 * @param x1 - The 1st color component
 * @param x2 - The 2nd color component
 * @param x3 - The 3rd color component
 * @param [colorspace="sRGB"] - The colorspace
 */
export function color(
  x1: number,
  x2: number,
  x3: number,
  colorspace?: string
): Color;

interface ColorScale {
  (t: number): [number, number, number] | string;

  /** Get/set the domain */
  domain(value: number[]): ColorScale;
  domain(): number[];

  /** Get/set the range */
  range(value: (string | Color | number[])[]): ColorScale;
  range(): Color[];

  /** Get/set the interpolation colorspace */
  mode(value: string): ColorScale;
  mode(): string;

  /** Get/set the output colorspace */
  output(value: string): ColorScale;
  output(): string;

  /** Get/set the output representation */
  repr(value: string): ColorScale;
  repr(): string;
}

/** Create a colorscale */
export function scale(): ColorScale;
