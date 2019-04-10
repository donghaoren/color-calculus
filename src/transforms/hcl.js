export function lab_to_hcl(l, a, b) {
  const c = Math.sqrt(a * a + b * b);
  let h_degree = (Math.atan2(b, a) / Math.PI) * 180;
  h_degree = ((h_degree % 360) + 360) % 360;
  return [h_degree, c, l];
}

export function lab_to_hcl_derivative(l, a, b) {
  const c2 = a * a + b * b;
  if (c2 < 1e-8) {
    return [[0, 0, 0], [0, 0, 0], [1, 0, 0]];
  } else {
    const c = Math.sqrt(c2);
    let h_degree = (Math.atan2(b, a) / Math.PI) * 180;
    h_degree = ((h_degree % 360) + 360) % 360;
    return [
      [0, (-b / c2 / Math.PI) * 180, (a / c2 / Math.PI) * 180],
      [0, a / c, b / c],
      [1, 0, 0]
    ];
  }
}

export function hcl_to_lab(h_degree, c, l) {
  const h = (h_degree / 180) * Math.PI;
  return [l, c * Math.cos(h), c * Math.sin(h)];
}

export function hcl_to_lab_derivative(h_degree, c, l) {
  const h = (h_degree / 180) * Math.PI;
  return [
    [0, 0, 1],
    [((-c * Math.sin(h)) / 180) * Math.PI, Math.cos(h), 0],
    [((c * Math.cos(h)) / 180) * Math.PI, Math.sin(h), 0]
  ];
}
