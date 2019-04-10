import { matmul_3x3, matmul_3x3_v } from "../matmul";

const M_CAT02 = [
  [0.7328, 0.4296, -0.1624],
  [-0.7036, 1.6975, 0.0061],
  [0.003, 0.0136, 0.9834]
];

const M_CAT02_inv = [
  [1.096124, -0.278869, 0.182745],
  [0.454369, 0.473533, 0.072098],
  [-0.009628, -0.005698, 1.015326]
];

const M_HPE = [
  [0.7409792, 0.218025, 0.0410058],
  [0.2853532, 0.6242014, 0.0904454],
  [-0.009628, -0.005698, 1.015326]
];

const M_HPE_inv = [
  [1.559152, -0.544722, -0.014445],
  [-0.714327, 1.85031, -0.135977],
  [0.010776, 0.005219, 0.984005]
];

function nonlinear_adaptation(c, fl) {
  const p = Math.pow((fl * c) / 100.0, 0.42);
  return (400.0 * p) / (27.13 + p) + 0.1;
}

function inverse_nonlinear_adaptation(c, fl) {
  if (c < 0.1) return NaN;
  return (
    (100.0 / fl) *
    Math.pow((27.13 * (c - 0.1)) / (400.0 - (c - 0.1)), 1.0 / 0.42)
  );
}

export function CIECAM02Model(Xw, Yw, Zw, LA, Yb, surround) {
  // Compute parameters (starting with _) regarding the viewing condition
  const [_F, _c, _Nc] =
    surround == "average" || surround == undefined
      ? [1.0, 0.69, 1.0]
      : surround == "dim"
      ? [0.9, 0.59, 0.9]
      : surround == "dark"
      ? [0.8, 0.525, 0.8]
      : [surround.F, surround.c, surround.Nc];
  const [_Rw, _Gw, _Bw] = matmul_3x3_v(M_CAT02, [Xw, Yw, Zw]);
  const _n = Yb / Yw;
  const _z = 1.48 + Math.pow(_n, 0.5);
  const _k = 1.0 / (5.0 * LA + 1.0);
  const _FL =
    0.2 * Math.pow(_k, 4.0) * (5.0 * LA) +
    0.1 *
      Math.pow(1.0 - Math.pow(_k, 4.0), 2.0) *
      Math.pow(5.0 * LA, 1.0 / 3.0);
  const _Nbb = 0.725 * Math.pow(1.0 / _n, 0.2);
  const _Ncb = _Nbb;
  const _D = _F * (1.0 - (1.0 / 3.6) * Math.exp((-LA - 42.0) / 92.0));
  let _Aw;
  {
    // achromatic_response_to_white
    const rc = _Rw * ((Yw * _D) / _Rw + (1.0 - _D));
    const gc = _Gw * ((Yw * _D) / _Gw + (1.0 - _D));
    const bc = _Bw * ((Yw * _D) / _Bw + (1.0 - _D));
    const [rp, gp, bp] = matmul_3x3_v(M_HPE, [rc, gc, bc]);
    const rpa = nonlinear_adaptation(rp, _FL);
    const gpa = nonlinear_adaptation(gp, _FL);
    const bpa = nonlinear_adaptation(bp, _FL);
    _Aw = (2.0 * rpa + gpa + (1.0 / 20.0) * bpa - 0.305) * _Nbb;
  }
  const _M_LMS = matmul_3x3(
    M_HPE,
    matmul_3x3(
      [
        [(Yw * _D) / _Rw + 1 - _D, 0, 0],
        [0, (Yw * _D) / _Gw + 1 - _D, 0],
        [0, 0, (Yw * _D) / _Bw + 1 - _D]
      ],
      M_CAT02
    )
  );
  const _M_LMS_inv = matmul_3x3(
    M_CAT02_inv,
    matmul_3x3(
      [
        [1.0 / ((Yw * _D) / _Rw + 1 - _D), 0, 0],
        [0, 1.0 / ((Yw * _D) / _Gw + 1 - _D), 0],
        [0, 0, 1.0 / ((Yw * _D) / _Bw + 1 - _D)]
      ],
      M_HPE_inv
    )
  );

  function JCh_to_correlates(J, C, h) {
    let temp;
    let H;
    if (h < 20.14) {
      temp = (h + 122.47) / 1.2 + (20.14 - h) / 0.8;
      H = 300 + (100 * ((h + 122.47) / 1.2)) / temp;
    } else if (h < 90.0) {
      temp = (h - 20.14) / 0.8 + (90.0 - h) / 0.7;
      H = (100 * ((h - 20.14) / 0.8)) / temp;
    } else if (h < 164.25) {
      temp = (h - 90.0) / 0.7 + (164.25 - h) / 1.0;
      H = 100 + (100 * ((h - 90.0) / 0.7)) / temp;
    } else if (h < 237.53) {
      temp = (h - 164.25) / 1.0 + (237.53 - h) / 1.2;
      H = 200 + (100 * ((h - 164.25) / 1.0)) / temp;
    } else {
      temp = (h - 237.53) / 1.2 + (360 - h + 20.14) / 0.8;
      H = 300 + (100 * ((h - 237.53) / 1.2)) / temp;
    }
    const Q =
      (4.0 / _c) * Math.sqrt(J / 100.0) * (_Aw + 4.0) * Math.pow(_FL, 0.25);
    const M = C * Math.pow(_FL, 0.25);
    const s = 100.0 * Math.sqrt(M / Q);
    const ac = C * Math.cos((h * Math.PI) / 180.0);
    const bc = C * Math.sin((h * Math.PI) / 180.0);
    const am = M * Math.cos((h * Math.PI) / 180.0);
    const bm = M * Math.sin((h * Math.PI) / 180.0);
    const as = s * Math.cos((h * Math.PI) / 180.0);
    const bs = s * Math.sin((h * Math.PI) / 180.0);
    return { J, C, h, H, Q, M, s, ac, bc, am, bm, as, bs };
  }

  function xyz_to_LMS(x, y, z) {
    const [rp, gp, bp] = matmul_3x3_v(_M_LMS, [x, y, z]);
    const rpa = nonlinear_adaptation(rp, _FL);
    const gpa = nonlinear_adaptation(gp, _FL);
    const bpa = nonlinear_adaptation(bp, _FL);
    return [rpa, gpa, bpa];
  }

  function LMS_to_xyz(rpa, gpa, bpa) {
    const rp = inverse_nonlinear_adaptation(rpa, _FL);
    const gp = inverse_nonlinear_adaptation(gpa, _FL);
    const bp = inverse_nonlinear_adaptation(bpa, _FL);
    return matmul_3x3_v(_M_LMS_inv, [rp, gp, bp]);
  }

  const _k1 = (50000.0 / 13.0) * _Nc * _Ncb;
  const _k2 = Math.pow(1.64 - Math.pow(0.29, _n), 0.73);
  function LMS_to_JCh(rpa, gpa, bpa) {
    const ca = rpa - (12.0 * gpa) / 11.0 + bpa / 11.0;
    const cb = (1.0 / 9.0) * (rpa + gpa - 2.0 * bpa);
    let h = (180.0 / Math.PI) * Math.atan2(cb, ca);
    if (h < 0.0) h += 360.0;
    const A = (2.0 * rpa + gpa + (1.0 / 20.0) * bpa - 0.305) * _Nbb;
    const J = 100.0 * Math.pow(A / _Aw, _c * _z);
    const et = (1.0 / 4.0) * (Math.cos((h * Math.PI) / 180.0 + 2.0) + 3.8);
    const t =
      (_k1 * et * Math.sqrt(ca * ca + cb * cb)) /
      (rpa + gpa + (21.0 / 20.0) * bpa);
    const C = Math.pow(t, 0.9) * Math.sqrt(J / 100.0) * _k2;
    return [J, C, h];
  }

  function JCh_to_LMS(J, C, h) {
    const t = Math.pow(C / (Math.sqrt(J / 100.0) * _k2), 1.0 / 0.9);
    const hr = (h * Math.PI) / 180.0;
    const cos_hr = Math.cos(hr);
    const sin_hr = Math.sin(hr);
    const et = (1.0 / 4.0) * (Math.cos(hr + 2.0) + 3.8);
    const A = Math.pow(J / 100.0, 1.0 / (_c * _z)) * _Aw;
    const p1 = (_k1 * et) / t;
    const p2 = A / _Nbb + 0.305;
    const p3 = 21.0 / 20.0;
    let ca, cb;
    if (Math.abs(sin_hr) >= Math.abs(cos_hr)) {
      const p4 = p1 / sin_hr;
      const div = cos_hr / sin_hr;
      cb =
        (p2 * (2.0 + p3) * (460.0 / 1403.0)) /
        (p4 +
          (2.0 + p3) * (220.0 / 1403.0) * div -
          27.0 / 1403.0 +
          p3 * (6300.0 / 1403.0));
      ca = cb * div;
    } else {
      const p5 = p1 / cos_hr;
      const div = sin_hr / cos_hr;
      ca =
        (p2 * (2.0 + p3) * (460.0 / 1403.0)) /
        (p5 +
          (2.0 + p3) * (220.0 / 1403.0) -
          (27.0 / 1403.0 - p3 * (6300.0 / 1403.0)) * div);
      cb = ca * div;
    }
    const x = 0.32787 * (A / _Nbb + 0.305);
    return [
      x + 0.32145 * ca + 0.20527 * cb,
      x - 0.63507 * ca - 0.18603 * cb,
      x - 0.15681 * ca - 4.49038 * cb
    ];
  }

  function JCh_to_Jab(J, C, h) {
    const c1 = 0.007;
    const c2 = 0.0228;
    const M = C * Math.pow(_FL, 0.25);
    const Jp = ((1 + 100 * c1) * J) / (1 + c1 * J);
    const Mp = Math.log(1 + c2 * M) / c2;
    const a = Mp * Math.cos((h / 180) * Math.PI);
    const b = Mp * Math.sin((h / 180) * Math.PI);
    return [Jp, a, b];
  }

  function Jab_to_JCh(Jp, a, b) {
    const c1 = 0.007;
    const c2 = 0.0228;
    let h = (180.0 / Math.PI) * Math.atan2(b, a);
    if (h < 0.0) h += 360.0;
    const Mp = Math.sqrt(a * a + b * b);
    const M = (Math.exp(Mp * c2) - 1) / c2;
    const C = M / Math.pow(_FL, 0.25);
    const J = Jp / (1 + c1 * (100 - Jp));
    return [J, C, h];
  }

  function xyz_to_JCh(x, y, z) {
    const [rpa, gpa, bpa] = xyz_to_LMS(x, y, z);
    return LMS_to_JCh(rpa, gpa, bpa);
  }

  function JCh_to_xyz(J, C, h) {
    const [rpa, gpa, bpa] = JCh_to_LMS(J, C, h);
    return LMS_to_xyz(rpa, gpa, bpa);
  }

  function Jab_to_xyz(J, a, b) {
    const [J1, C, h] = Jab_to_JCh(J, a, b);
    const [rpa, gpa, bpa] = JCh_to_LMS(J1, C, h);
    return LMS_to_xyz(rpa, gpa, bpa);
  }

  function xyz_to_Jab(x, y, z) {
    const [rpa, gpa, bpa] = xyz_to_LMS(x, y, z);
    const [J1, C, h] = LMS_to_JCh(rpa, gpa, bpa);
    return JCh_to_Jab(J1, C, h);
  }

  return {
    xyz_to_JCh,
    JCh_to_xyz,
    Jab_to_xyz,
    xyz_to_Jab,
    JCh_to_Jab,
    Jab_to_JCh,
    JCh_to_correlates
  };
}
