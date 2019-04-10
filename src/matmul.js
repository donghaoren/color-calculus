/**
 * Multiply two 3x3 matrices
 * @param {number[][]} a left-hand matrix
 * @param {number[][]} b right-hand matrix
 */
export function matmul_3x3(a, b) {
  const r = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      r[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j] + a[i][2] * b[2][j];
    }
  }
  return r;
}

/**
 * Multiply a 3x3 matrix and a 3D vector
 * @param {number[][]} a left-hand matrix
 * @param {number[]} v right hand vector
 */
export function matmul_3x3_v(a, v) {
  return [
    a[0][0] * v[0] + a[0][1] * v[1] + a[0][2] * v[2],
    a[1][0] * v[0] + a[1][1] * v[1] + a[1][2] * v[2],
    a[2][0] * v[0] + a[2][1] * v[1] + a[2][2] * v[2]
  ];
}
