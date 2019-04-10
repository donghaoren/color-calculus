import { RGBModel } from "../models/RGB";

const functions = RGBModel({
  matrix: [
    [0.4124564, 0.3575761, 0.1804375],
    [0.2126729, 0.7151522, 0.072175],
    [0.0193339, 0.119192, 0.9503041]
  ],
  matrixInverse: [
    [3.2404542, -1.5371385, -0.4985314],
    [-0.969266, 1.8760108, 0.041556],
    [0.0556434, -0.2040259, 1.0572252]
  ],
  fx: {
    gamma: 2.4,
    a: 1.0 / 1.055,
    b: 0.055 / 1.055,
    c: 1.0 / 12.92,
    d: 0.04045
  }
});

export const sRGB_to_xyz = functions.RGB_to_xyz;
export const sRGB_to_xyz_derivative = functions.RGB_to_xyz_derivative;

export const xyz_to_sRGB = functions.xyz_to_RGB;
export const xyz_to_sRGB_derivative = functions.xyz_to_RGB_derivative;
