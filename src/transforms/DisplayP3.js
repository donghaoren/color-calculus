import { RGBModel } from "../models/RGB";

const functions = RGBModel({
  matrix: [
    [0.486466, 0.265702, 0.19809],
    [0.228786, 0.691495, 0.079705],
    [0.000056, 0.045269, 1.043834]
  ],
  matrixInverse: [
    [2.493997, -0.931975, -0.402126],
    [-0.829288, 1.763302, 0.022733],
    [0.035832, -0.076422, 0.957042]
  ],
  fx: {
    gamma: 2.4,
    a: 1.0 / 1.055,
    b: 0.055 / 1.055,
    c: 1.0 / 12.92,
    d: 0.04045
  }
});

export const DisplayP3_to_xyz = functions.RGB_to_xyz;
export const DisplayP3_to_xyz_derivative = functions.RGB_to_xyz_derivative;

export const xyz_to_DisplayP3 = functions.xyz_to_RGB;
export const xyz_to_DisplayP3_derivative = functions.xyz_to_RGB_derivative;
