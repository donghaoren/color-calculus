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

// [GENERATED_CODE]

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
