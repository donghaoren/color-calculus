import { RGBModel } from "../models/RGB";

const functions = RGBModel({
  matrix: [
    [0.4497288, 0.3162486, 0.1844926],
    [0.2446525, 0.6720283, 0.0833192],
    [0.0251848, 0.1411824, 0.9224628]
  ],
  matrixInverse: [
    [2.9515373, -1.2894116, -0.4738445],
    [-1.0851093, 1.9908566, 0.0372026],
    [0.0854934, -0.2694964, 1.0912975]
  ],
  fx: {
    gamma: 1.8,
    a: 1.0,
    b: 0,
    c: 1,
    d: 0
  }
});

export const AppleRGB_to_xyz = functions.RGB_to_xyz;
export const AppleRGB_to_xyz_derivative = functions.RGB_to_xyz_derivative;

export const xyz_to_AppleRGB = functions.xyz_to_RGB;
export const xyz_to_AppleRGB_derivative = functions.xyz_to_RGB_derivative;
