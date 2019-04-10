import { D50_Xn, D50_Yn, D50_Zn } from "./white_points";
import { matmul_3x3_v, matmul_3x3 } from "../matmul";
const M_D65_to_D50 = [
  [1.0478112, 0.0228866, -0.050127],
  [0.0295424, 0.9904844, -0.0170491],
  [-0.0092345, 0.0150436, 0.7521316]
];
const M_D65_to_D50_inv = [
  [0.9555766, -0.0230393, 0.0631636],
  [-0.0282895, 1.0099416, 0.0210077],
  [0.0122982, -0.020483, 1.3299098]
];

function lab_to_xyz_f(t) {
  if (t > 0.20689655172413793) {
    return t * t * t;
  } else {
    return 0.12841854934601665 * (t - 0.13793103448275862);
  }
}

function lab_to_xyz_f_derivative(t) {
  if (t > 0.20689655172413793) {
    return 3 * t * t;
  } else {
    return 0.12841854934601665;
  }
}

export function lab_to_xyz(l, a, b) {
  const x = D50_Xn * lab_to_xyz_f((l + 16) / 116 + a / 500);
  const y = D50_Yn * lab_to_xyz_f((l + 16) / 116);
  const z = D50_Zn * lab_to_xyz_f((l + 16) / 116 - b / 200);
  return matmul_3x3_v(M_D65_to_D50_inv, [x, y, z]);
}

export function lab_to_xyz_derivative(l, a, b) {
  const dx = [
    (D50_Xn * lab_to_xyz_f_derivative((l + 16) / 116 + a / 500)) / 116,
    (D50_Xn * lab_to_xyz_f_derivative((l + 16) / 116 + a / 500)) / 500,
    0
  ];
  const dy = [(D50_Yn * lab_to_xyz_f_derivative((l + 16) / 116)) / 116, 0, 0];
  const dz = [
    (D50_Zn * lab_to_xyz_f_derivative((l + 16) / 116 - b / 200)) / 116,
    0,
    (-D50_Zn * lab_to_xyz_f_derivative((l + 16) / 116 - b / 200)) / 200
  ];
  return matmul_3x3(M_D65_to_D50_inv, [dx, dy, dz]);
}

function xyz_to_lab_f(t) {
  if (t > 0.008856451679035631) {
    return Math.cbrt(t);
  } else {
    return t / 0.12841854934601665 + 0.13793103448275862;
  }
}

function xyz_to_lab_f_derivative(t) {
  if (t > 0.008856451679035631) {
    return Math.pow(t, -2.0 / 3.0) / 3.0;
  } else {
    return 1.0 / 0.12841854934601665;
  }
}

export function xyz_to_lab(x1, y1, z1) {
  const [x, y, z] = matmul_3x3_v(M_D65_to_D50, [x1, y1, z1]);
  // D65 white point:
  const l = 116 * xyz_to_lab_f(y / D50_Yn) - 16;
  const a = 500 * (xyz_to_lab_f(x / D50_Xn) - xyz_to_lab_f(y / D50_Yn));
  const b = 200 * (xyz_to_lab_f(y / D50_Yn) - xyz_to_lab_f(z / D50_Zn));
  return [l, a, b];
}

export function xyz_to_lab_derivative(x1, y1, z1) {
  const [x, y, z] = matmul_3x3_v(M_D65_to_D50, [x1, y1, z1]);
  // D65 white point:
  const dl = [0, (116 * xyz_to_lab_f_derivative(y / D50_Yn)) / D50_Yn, 0];
  const da = [
    (500 / D50_Xn) * xyz_to_lab_f_derivative(x / D50_Xn),
    -(500 / D50_Yn) * xyz_to_lab_f_derivative(y / D50_Yn),
    0
  ];
  const db = [
    0,
    (200 / D50_Yn) * xyz_to_lab_f_derivative(y / D50_Yn),
    (-200 / D50_Zn) * xyz_to_lab_f_derivative(z / D50_Zn)
  ];
  return matmul_3x3([dl, da, db], M_D65_to_D50);
}
