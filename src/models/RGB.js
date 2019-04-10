function make_transform(fx) {
  const { gamma, a, b, c, d } = fx;
  return [
    x => {
      if (x < d) {
        return c * x;
      } else {
        return Math.pow(a * x + b, gamma);
      }
    },
    x => {
      if (x < d) {
        return c;
      } else {
        return gamma * a * Math.pow(a * x + b, gamma - 1);
      }
    }
  ];
}

function make_transform_inv(fx) {
  const { gamma, a, b, c, d } = fx;
  return [
    y => {
      if (y < c * d) {
        return y / c;
      } else {
        return (Math.pow(y, 1.0 / gamma) - b) / a;
      }
    },
    y => {
      if (y < c * d) {
        return 1.0 / c;
      } else {
        return Math.pow(y, 1.0 / gamma - 1) / a / gamma;
      }
    }
  ];
}

export function RGBModel(options) {
  const m = options.matrix;
  const mInv = options.matrixInverse;
  const [gamma_f, gamma_df] = make_transform(options.fx);
  const [gamma_inv_f, gamma_inv_df] = make_transform_inv(options.fx);
  function RGB_to_xyz(r, g, b) {
    const Rl = gamma_f(r / 255) * 100;
    const Gl = gamma_f(g / 255) * 100;
    const Bl = gamma_f(b / 255) * 100;
    const x = m[0][0] * Rl + m[0][1] * Gl + m[0][2] * Bl;
    const y = m[1][0] * Rl + m[1][1] * Gl + m[1][2] * Bl;
    const z = m[2][0] * Rl + m[2][1] * Gl + m[2][2] * Bl;
    return [x, y, z];
  }
  function RGB_to_xyz_derivative(r, g, b) {
    const dRl = (gamma_df(r / 255) * 100) / 255;
    const dGl = (gamma_df(g / 255) * 100) / 255;
    const dBl = (gamma_df(b / 255) * 100) / 255;
    const dx = [m[0][0] * dRl, m[0][1] * dGl, m[0][2] * dBl];
    const dy = [m[1][0] * dRl, m[1][1] * dGl, m[1][2] * dBl];
    const dz = [m[2][0] * dRl, m[2][1] * dGl, m[2][2] * dBl];
    return [dx, dy, dz];
  }
  function xyz_to_RGB(x, y, z) {
    const Rl = mInv[0][0] * x + mInv[0][1] * y + mInv[0][2] * z;
    const Gl = mInv[1][0] * x + mInv[1][1] * y + mInv[1][2] * z;
    const Bl = mInv[2][0] * x + mInv[2][1] * y + mInv[2][2] * z;
    return [
      gamma_inv_f(Rl / 100) * 255,
      gamma_inv_f(Gl / 100) * 255,
      gamma_inv_f(Bl / 100) * 255
    ];
  }
  function xyz_to_RGB_derivative(x, y, z) {
    const Rl = mInv[0][0] * x + mInv[0][1] * y + mInv[0][2] * z;
    const Gl = mInv[1][0] * x + mInv[1][1] * y + mInv[1][2] * z;
    const Bl = mInv[2][0] * x + mInv[2][1] * y + mInv[2][2] * z;
    const dRl = (gamma_inv_df(Rl / 100) * 255) / 100;
    const dGl = (gamma_inv_df(Gl / 100) * 255) / 100;
    const dBl = (gamma_inv_df(Bl / 100) * 255) / 100;
    return [
      [mInv[0][0] * dRl, mInv[0][1] * dRl, mInv[0][2] * dRl],
      [mInv[1][0] * dGl, mInv[1][1] * dGl, mInv[1][2] * dGl],
      [mInv[2][0] * dBl, mInv[2][1] * dBl, mInv[2][2] * dBl]
    ];
  }
  return {
    RGB_to_xyz,
    RGB_to_xyz_derivative,
    xyz_to_RGB,
    xyz_to_RGB_derivative
  };
}
