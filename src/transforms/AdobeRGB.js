import { RGBModel } from "../models/RGB";

const functions = RGBModel({
  matrix: [
    [0.5767309, 0.185554, 0.1881852],
    [0.2973769, 0.6273491, 0.0752741],
    [0.0270343, 0.0706872, 0.9911085]
  ],
  matrixInverse: [
    [2.041369, -0.5649464, -0.3446944],
    [-0.969266, 1.8760108, 0.041556],
    [0.0134474, -0.1183897, 1.0154096]
  ],
  fx: {
    gamma: 2.19921875,
    a: 1.0,
    b: 0,
    c: 1,
    d: 0
  }
});

export const AdobeRGB_to_xyz = functions.RGB_to_xyz;
export const AdobeRGB_to_xyz_derivative = functions.RGB_to_xyz_derivative;

export const xyz_to_AdobeRGB = functions.xyz_to_RGB;
export const xyz_to_AdobeRGB_derivative = functions.xyz_to_RGB_derivative;
