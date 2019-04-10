function c_as_hex(c) {
  c = Math.min(255, Math.max(0, Math.round(c)));
  let s = c.toString(16);
  while (s.length < 2) {
    s = "0" + s;
  }
  return s;
}

function c_as_str(c) {
  c = Math.min(255, Math.max(0, Math.round(c)));
  return c.toString();
}

/** Represent rgb values as HEX (e.g., "#1f77b4") */
export function rgb_as_hex(r, g, b) {
  return "#" + c_as_hex(r) + c_as_hex(g) + c_as_hex(b);
}

/** Represent rgba values as css (e.g., "rgba(31,119,180,1)") */
export function rgba_as_css(r, g, b, a) {
  return `rgba(${c_as_str(r)},${c_as_str(g)},${c_as_str(b)},${c_as_str(a)})`;
}

/** Represent rgba values as WebGL color */
export function rgba_as_gl(r, g, b, a) {
  return [
    Math.max(0, Math.min(1, r / 255.0)),
    Math.max(0, Math.min(1, g / 255.0)),
    Math.max(0, Math.min(1, b / 255.0)),
    a
  ];
}
