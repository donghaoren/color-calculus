// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
/** A seeded random generator */
function mulberry32(a) {
  return function() {
    var t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Pretty print floating-point color values */
function formatColor(c) {
  return `(${c[0].toFixed(3)},${c[1].toFixed(3)},${c[2].toFixed(3)})`;
}

/** Expect two colors are equal, with tolerance of max absolute difference defaults to 1.5 */
function expectColorEquals(c1, c2, tolerance = 1.5) {
  const diff1 = Math.abs(c1[0] - c2[0]);
  const diff2 = Math.abs(c1[1] - c2[1]);
  const diff3 = Math.abs(c1[2] - c2[2]);
  if (isNaN(diff1) || isNaN(diff2) || isNaN(diff3)) {
    throw new Error(`Color ${formatColor(c1)} != ${formatColor(c2)}`);
  }
  const maxDiff = Math.max(diff1, diff2, diff3);
  if (maxDiff > tolerance) {
    throw new Error(`Color ${formatColor(c1)} != ${formatColor(c2)}`);
  }
}

function expectDeepEquals(a, b) {
  const ja = JSON.stringify(a);
  const jb = JSON.stringify(b);
  if (ja != jb) {
    throw new Error(`${ja} is not deep equal to ${jb}`);
  }
}

/** Check if func_derivative computes the derivative (Jacobian) of func */
function expectDerivativeCorrect(
  func,
  funcDerivative,
  inDim,
  inMin,
  inMax,
  outDim,
  threshold = 1e-4
) {
  const rand = mulberry32(0);
  const samples = 1000;
  if (typeof inMin == "number") {
    inMin = [inMin];
  }
  if (typeof inMax == "number") {
    inMax = [inMax];
  }
  let totalMagnitudeN = 0;
  let totalMagnitude = 0;
  let totalDistanceN = 0;
  let totalDistance = 0;
  let errorCount = 0;
  for (let i = 0; i < samples; i++) {
    const input = inMin.map((x, i) => {
      return rand() * (inMax[i] - inMin[i]) + inMin[i];
    });
    const dfx = funcDerivative(...input);
    // Check the derivative
    for (let i = 0; i < inDim; i++) {
      const eps = 1e-7;
      const input1 = input.map((x, k) => (k != i ? x : x - eps));
      const input2 = input.map((x, k) => (k != i ? x : x + eps));
      const fx1 = func(...input1);
      const fx2 = func(...input2);
      for (let j = 0; j < outDim; j++) {
        const derivative = (fx2[j] - fx1[j]) / eps / 2;
        const magnitude = Math.abs(derivative);
        totalMagnitudeN += 1;
        totalMagnitude += magnitude;
        const distance = Math.abs(derivative - dfx[j][i]);
        if (isNaN(dfx[j][i]) || distance > threshold) {
          errorCount += 1;
          if (!isNaN(distance)) {
            totalDistanceN += 1;
            totalDistance += distance;
          }
        }
      }
    }
  }
  // console.log(totalMagnitude / totalMagnitudeN);
  if (errorCount > 0) {
    throw new Error(
      `Derivative incorrect, with ${errorCount} (${(
        (errorCount / (samples * inDim * outDim)) *
        100
      ).toFixed(1)}%) errors; average error distance = ${totalDistance /
        totalDistanceN}`
    );
  }
}

exports.mulberry32 = mulberry32;
exports.formatColor = formatColor;
exports.expectColorEquals = expectColorEquals;
exports.expectDerivativeCorrect = expectDerivativeCorrect;
exports.expectDeepEquals = expectDeepEquals;
