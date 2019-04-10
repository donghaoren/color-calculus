// This file is automatically generated by utils/generate_code.js
import { matmul_3x3 } from "./matmul";

export const version = "0.2.0";

/** Compose a series of color conversion functions. Used in the generated code */
function compose(functions) {
  const N = functions.length;
  if (N == 1) {
    const f0 = functions[0];
    return function(c1, c2, c3) {
      let c =
        typeof c1 != "number" ? [+c1[0], +c1[1], +c1[2]] : [+c1, +c2, +c3];
      return f0(c[0], c[1], c[2]);
    };
  } else {
    return function(c1, c2, c3) {
      let c =
        typeof c1 != "number" ? [+c1[0], +c1[1], +c1[2]] : [+c1, +c2, +c3];
      for (let i = 0; i < N; i++) {
        c = functions[i](c[0], c[1], c[2]);
      }
      return c;
    };
  }
}

/** Compose a series of derivative functions. Used in the generated code */
function compose_derivative(functions) {
  const N = functions.length;
  if (N == 1) {
    const f0 = functions[0][1];
    return function(c1, c2, c3) {
      let c =
        typeof c1 != "number" ? [+c1[0], +c1[1], +c1[2]] : [+c1, +c2, +c3];
      return f0(c[0], c[1], c[2]);
    };
  } else {
    return function(c1, c2, c3) {
      let c =
        typeof c1 != "number" ? [+c1[0], +c1[1], +c1[2]] : [+c1, +c2, +c3];
      let d = null;
      for (let i = 0; i < N; i++) {
        const nd = functions[i][1](c[0], c[1], c[2]);
        d = d ? matmul_3x3(nd, d) : nd;
        if (i < N - 1) {
          c = functions[i][0](c[0], c[1], c[2]);
        }
      }
      return d;
    };
  }
}

import {
  AdobeRGB_to_xyz as _I0,
  xyz_to_AdobeRGB as _I1,
  AdobeRGB_to_xyz_derivative as _I2,
  xyz_to_AdobeRGB_derivative as _I3
} from "./transforms/AdobeRGB";
import {
  AppleRGB_to_xyz as _I4,
  xyz_to_AppleRGB as _I5,
  AppleRGB_to_xyz_derivative as _I6,
  xyz_to_AppleRGB_derivative as _I7
} from "./transforms/AppleRGB";
import {
  JCh_to_xyz as _I8,
  xyz_to_JCh as _I9,
  Jab_to_xyz as _Ia,
  xyz_to_Jab as _Ib
} from "./transforms/CIECAM02";
import {
  DisplayP3_to_xyz as _Ic,
  xyz_to_DisplayP3 as _Id,
  DisplayP3_to_xyz_derivative as _Ie,
  xyz_to_DisplayP3_derivative as _If
} from "./transforms/DisplayP3";
import {
  lab_to_hcl as _I10,
  hcl_to_lab as _I11,
  lab_to_hcl_derivative as _I12,
  hcl_to_lab_derivative as _I13
} from "./transforms/hcl";
import {
  lab_to_xyz as _I14,
  xyz_to_lab as _I15,
  lab_to_xyz_derivative as _I16,
  xyz_to_lab_derivative as _I17
} from "./transforms/lab";
import {
  sRGB_to_xyz as _I18,
  xyz_to_sRGB as _I19,
  sRGB_to_xyz_derivative as _I1a,
  xyz_to_sRGB_derivative as _I1b
} from "./transforms/sRGB";
export const AdobeRGB_to_AppleRGB = compose([_I0, _I5]);
export const AdobeRGB_to_DisplayP3 = compose([_I0, _Id]);
export const AdobeRGB_to_JCh = compose([_I0, _I9]);
export const AdobeRGB_to_Jab = compose([_I0, _Ib]);
export const AdobeRGB_to_hcl = compose([_I0, _I15, _I10]);
export const AdobeRGB_to_lab = compose([_I0, _I15]);
export const AdobeRGB_to_sRGB = compose([_I0, _I19]);
export const AdobeRGB_to_xyz = compose([_I0]);
export const AppleRGB_to_AdobeRGB = compose([_I4, _I1]);
export const AppleRGB_to_DisplayP3 = compose([_I4, _Id]);
export const AppleRGB_to_JCh = compose([_I4, _I9]);
export const AppleRGB_to_Jab = compose([_I4, _Ib]);
export const AppleRGB_to_hcl = compose([_I4, _I15, _I10]);
export const AppleRGB_to_lab = compose([_I4, _I15]);
export const AppleRGB_to_sRGB = compose([_I4, _I19]);
export const AppleRGB_to_xyz = compose([_I4]);
export const DisplayP3_to_AdobeRGB = compose([_Ic, _I1]);
export const DisplayP3_to_AppleRGB = compose([_Ic, _I5]);
export const DisplayP3_to_JCh = compose([_Ic, _I9]);
export const DisplayP3_to_Jab = compose([_Ic, _Ib]);
export const DisplayP3_to_hcl = compose([_Ic, _I15, _I10]);
export const DisplayP3_to_lab = compose([_Ic, _I15]);
export const DisplayP3_to_sRGB = compose([_Ic, _I19]);
export const DisplayP3_to_xyz = compose([_Ic]);
export const JCh_to_AdobeRGB = compose([_I8, _I1]);
export const JCh_to_AppleRGB = compose([_I8, _I5]);
export const JCh_to_DisplayP3 = compose([_I8, _Id]);
export const JCh_to_Jab = compose([_I8, _Ib]);
export const JCh_to_hcl = compose([_I8, _I15, _I10]);
export const JCh_to_lab = compose([_I8, _I15]);
export const JCh_to_sRGB = compose([_I8, _I19]);
export const JCh_to_xyz = compose([_I8]);
export const Jab_to_AdobeRGB = compose([_Ia, _I1]);
export const Jab_to_AppleRGB = compose([_Ia, _I5]);
export const Jab_to_DisplayP3 = compose([_Ia, _Id]);
export const Jab_to_JCh = compose([_Ia, _I9]);
export const Jab_to_hcl = compose([_Ia, _I15, _I10]);
export const Jab_to_lab = compose([_Ia, _I15]);
export const Jab_to_sRGB = compose([_Ia, _I19]);
export const Jab_to_xyz = compose([_Ia]);
export const hcl_to_AdobeRGB = compose([_I11, _I14, _I1]);
export const hcl_to_AppleRGB = compose([_I11, _I14, _I5]);
export const hcl_to_DisplayP3 = compose([_I11, _I14, _Id]);
export const hcl_to_JCh = compose([_I11, _I14, _I9]);
export const hcl_to_Jab = compose([_I11, _I14, _Ib]);
export const hcl_to_lab = compose([_I11]);
export const hcl_to_sRGB = compose([_I11, _I14, _I19]);
export const hcl_to_xyz = compose([_I11, _I14]);
export const lab_to_AdobeRGB = compose([_I14, _I1]);
export const lab_to_AppleRGB = compose([_I14, _I5]);
export const lab_to_DisplayP3 = compose([_I14, _Id]);
export const lab_to_JCh = compose([_I14, _I9]);
export const lab_to_Jab = compose([_I14, _Ib]);
export const lab_to_hcl = compose([_I10]);
export const lab_to_sRGB = compose([_I14, _I19]);
export const lab_to_xyz = compose([_I14]);
export const sRGB_to_AdobeRGB = compose([_I18, _I1]);
export const sRGB_to_AppleRGB = compose([_I18, _I5]);
export const sRGB_to_DisplayP3 = compose([_I18, _Id]);
export const sRGB_to_JCh = compose([_I18, _I9]);
export const sRGB_to_Jab = compose([_I18, _Ib]);
export const sRGB_to_hcl = compose([_I18, _I15, _I10]);
export const sRGB_to_lab = compose([_I18, _I15]);
export const sRGB_to_xyz = compose([_I18]);
export const xyz_to_AdobeRGB = compose([_I1]);
export const xyz_to_AppleRGB = compose([_I5]);
export const xyz_to_DisplayP3 = compose([_Id]);
export const xyz_to_JCh = compose([_I9]);
export const xyz_to_Jab = compose([_Ib]);
export const xyz_to_hcl = compose([_I15, _I10]);
export const xyz_to_lab = compose([_I15]);
export const xyz_to_sRGB = compose([_I19]);
export const AdobeRGB_to_AppleRGB_derivative = compose_derivative([
  [_I0, _I2],
  [_I5, _I7]
]);
export const AdobeRGB_to_DisplayP3_derivative = compose_derivative([
  [_I0, _I2],
  [_Id, _If]
]);
export const AdobeRGB_to_hcl_derivative = compose_derivative([
  [_I0, _I2],
  [_I15, _I17],
  [_I10, _I12]
]);
export const AdobeRGB_to_lab_derivative = compose_derivative([
  [_I0, _I2],
  [_I15, _I17]
]);
export const AdobeRGB_to_sRGB_derivative = compose_derivative([
  [_I0, _I2],
  [_I19, _I1b]
]);
export const AdobeRGB_to_xyz_derivative = compose_derivative([[_I0, _I2]]);
export const AppleRGB_to_AdobeRGB_derivative = compose_derivative([
  [_I4, _I6],
  [_I1, _I3]
]);
export const AppleRGB_to_DisplayP3_derivative = compose_derivative([
  [_I4, _I6],
  [_Id, _If]
]);
export const AppleRGB_to_hcl_derivative = compose_derivative([
  [_I4, _I6],
  [_I15, _I17],
  [_I10, _I12]
]);
export const AppleRGB_to_lab_derivative = compose_derivative([
  [_I4, _I6],
  [_I15, _I17]
]);
export const AppleRGB_to_sRGB_derivative = compose_derivative([
  [_I4, _I6],
  [_I19, _I1b]
]);
export const AppleRGB_to_xyz_derivative = compose_derivative([[_I4, _I6]]);
export const DisplayP3_to_AdobeRGB_derivative = compose_derivative([
  [_Ic, _Ie],
  [_I1, _I3]
]);
export const DisplayP3_to_AppleRGB_derivative = compose_derivative([
  [_Ic, _Ie],
  [_I5, _I7]
]);
export const DisplayP3_to_hcl_derivative = compose_derivative([
  [_Ic, _Ie],
  [_I15, _I17],
  [_I10, _I12]
]);
export const DisplayP3_to_lab_derivative = compose_derivative([
  [_Ic, _Ie],
  [_I15, _I17]
]);
export const DisplayP3_to_sRGB_derivative = compose_derivative([
  [_Ic, _Ie],
  [_I19, _I1b]
]);
export const DisplayP3_to_xyz_derivative = compose_derivative([[_Ic, _Ie]]);
export const hcl_to_AdobeRGB_derivative = compose_derivative([
  [_I11, _I13],
  [_I14, _I16],
  [_I1, _I3]
]);
export const hcl_to_AppleRGB_derivative = compose_derivative([
  [_I11, _I13],
  [_I14, _I16],
  [_I5, _I7]
]);
export const hcl_to_DisplayP3_derivative = compose_derivative([
  [_I11, _I13],
  [_I14, _I16],
  [_Id, _If]
]);
export const hcl_to_lab_derivative = compose_derivative([[_I11, _I13]]);
export const hcl_to_sRGB_derivative = compose_derivative([
  [_I11, _I13],
  [_I14, _I16],
  [_I19, _I1b]
]);
export const hcl_to_xyz_derivative = compose_derivative([
  [_I11, _I13],
  [_I14, _I16]
]);
export const lab_to_AdobeRGB_derivative = compose_derivative([
  [_I14, _I16],
  [_I1, _I3]
]);
export const lab_to_AppleRGB_derivative = compose_derivative([
  [_I14, _I16],
  [_I5, _I7]
]);
export const lab_to_DisplayP3_derivative = compose_derivative([
  [_I14, _I16],
  [_Id, _If]
]);
export const lab_to_hcl_derivative = compose_derivative([[_I10, _I12]]);
export const lab_to_sRGB_derivative = compose_derivative([
  [_I14, _I16],
  [_I19, _I1b]
]);
export const lab_to_xyz_derivative = compose_derivative([[_I14, _I16]]);
export const sRGB_to_AdobeRGB_derivative = compose_derivative([
  [_I18, _I1a],
  [_I1, _I3]
]);
export const sRGB_to_AppleRGB_derivative = compose_derivative([
  [_I18, _I1a],
  [_I5, _I7]
]);
export const sRGB_to_DisplayP3_derivative = compose_derivative([
  [_I18, _I1a],
  [_Id, _If]
]);
export const sRGB_to_hcl_derivative = compose_derivative([
  [_I18, _I1a],
  [_I15, _I17],
  [_I10, _I12]
]);
export const sRGB_to_lab_derivative = compose_derivative([
  [_I18, _I1a],
  [_I15, _I17]
]);
export const sRGB_to_xyz_derivative = compose_derivative([[_I18, _I1a]]);
export const xyz_to_AdobeRGB_derivative = compose_derivative([[_I1, _I3]]);
export const xyz_to_AppleRGB_derivative = compose_derivative([[_I5, _I7]]);
export const xyz_to_DisplayP3_derivative = compose_derivative([[_Id, _If]]);
export const xyz_to_hcl_derivative = compose_derivative([
  [_I15, _I17],
  [_I10, _I12]
]);
export const xyz_to_lab_derivative = compose_derivative([[_I15, _I17]]);
export const xyz_to_sRGB_derivative = compose_derivative([[_I19, _I1b]]);

export { CIECAM02Model } from "./models/CIECAM02";
export { RGBModel } from "./models/RGB";

/** Identity conversion */
function identity(c1, c2, c3) {
  return typeof c1 != "number" ? [+c1[0], +c1[1], +c1[2]] : [+c1, +c2, +c3];
}

/** Derivative of identity */
function identity_derivative() {
  return [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
}

/** Get the color converter's derivative (Jacobian) function */
export function converter(source, target) {
  if (source == target) return identity;
  return exports[source + "_to_" + target];
}

/** Get the color converter's derivative (Jacobian) function */
export function converter_derivative(source, target) {
  if (source == target) return identity_derivative;
  return exports[source + "_to_" + target + "_derivative"];
}

// High level API
import { css_as_rgba } from "./parse";
import { rgb_as_hex, rgba_as_css, rgba_as_gl } from "./repr";

export class Color {
  constructor(arg1, arg2, arg3, arg4, arg5) {
    if (arg1 !== undefined) {
      if (arg1 instanceof Color) {
        this._v = arg1._v;
        this._a = arg1._a;
        this._s = arg1._s;
      } else if (typeof arg1 == "string") {
        const rgb = css_as_rgba(arg1);
        this._v = [rgb[0], rgb[1], rgb[2]];
        this._s = "sRGB";
        this._a = rgb[3];
      } else if (typeof arg1 == "number") {
        this._v = [+arg1, +arg2, +arg3];
        if (typeof arg4 == "number") {
          this._a = +arg4;
          this._s = arg5 || "sRGB";
        } else {
          this._a = 1.0;
          this._s = arg4 || "sRGB";
        }
      } else {
        this._v = [+arg1[0], +arg1[1], +arg1[2]];
        this._a = arg1[3] != null ? +arg1[3] : 1.0;
        this._s = arg2 || "sRGB";
      }
    }
  }

  alpha(x) {
    if (x === undefined) {
      return this._a;
    } else {
      this._a = x;
      return this;
    }
  }

  to(space = "sRGB", repr = null) {
    const c = space == this._s ? this._v : converter(this._s, space)(this._v);
    if (repr == "hex") {
      return rgb_as_hex(c[0], c[1], c[2]);
    } else if (repr == "css") {
      return rgba_as_css(c[0], c[1], c[2], this._a);
    } else if (repr == "gl") {
      return rgba_as_gl(c[0], c[1], c[2], this._a);
    } else {
      return c;
    }
  }

  lab() {
    return this.to("lab");
  }

  hcl() {
    return this.to("hcl");
  }

  Jab() {
    return this.to("Jab");
  }

  JCh() {
    return this.to("JCh");
  }

  xyz() {
    return this.to("xyz");
  }

  hex(space = "sRGB") {
    return this.to(space, "hex");
  }

  css(space = "sRGB") {
    return this.to(space, "css");
  }

  gl(space = "sRGB") {
    return this.to(space, "gl");
  }

  toString(space = "sRGB") {
    return this.hex(space);
  }
}

/** Alias for Color's constructor */
export function color(...args) {
  return new Color(...args);
}

/** Create a color scale */
export function scale() {
  let domain = [0, 1];
  let range = [color("#000000"), color("#ffffff")];
  let space = "lab";
  let output = "sRGB";
  let repr = "hex";
  let func = undefined;

  function scale(t) {
    if (func) {
      return func(t);
    } else {
      func = t => {
        const p = (t - domain[0]) / (domain[1] - domain[0]);
        const c1 = range[0].to(space);
        const c2 = range[1].to(space);
        return color(
          c1[0] * (1 - p) + c2[0] * p,
          c1[1] * (1 - p) + c2[1] * p,
          c1[2] * (1 - p) + c2[2] * p,
          space
        ).to(output, repr);
      };
      return func(t);
    }
  }

  scale.mode = arg =>
    arg === undefined ? space : ((space = arg), (func = undefined), scale);
  scale.domain = arg =>
    arg === undefined ? domain : ((domain = arg), (func = undefined), scale);
  scale.range = arg =>
    arg === undefined
      ? range
      : ((range = arg.map(color)), (func = undefined), scale);
  scale.output = arg =>
    arg === undefined ? domain : ((output = arg), (func = undefined), scale);
  scale.repr = arg =>
    arg === undefined ? domain : ((repr = arg), (func = undefined), scale);
  return scale;
}
