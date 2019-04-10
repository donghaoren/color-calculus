const ColorCalculus = require("..");
const {
  mulberry32,
  expectDeepEquals,
  expectColorEquals,
  expectDerivativeCorrect,
  formatColor
} = require("./helpers");

const knownTuples = [
  {
    sRGB: [31, 120, 180],
    AppleRGB: [30, 100, 167],
    AdobeRGB: [73, 120, 176],
    DisplayP3: [60, 119, 175],
    lab: [47.8, -9.68, -39.55]
  },
  {
    lab: [47.36, -8.866, -40.16],
    hcl: [257.54, 41.14, 47.36]
  }
];

const valueRanges = {
  sRGB: [[0, 0, 0], [255, 255, 255]],
  AppleRGB: [[0, 0, 0], [255, 255, 255]],
  AdobeRGB: [[0, 0, 0], [255, 255, 255]],
  DisplayP3: [[0, 0, 0], [255, 255, 255]],
  xyz: [[0, 0, 0], [100, 100, 100]],
  lab: [[0, -100, -100], [100, 100, 100]],
  hcl: [[0, 0, 0], [360, 100, 100]],
  Jab: [[1, -10, -10], [20, 10, 10]],
  JCh: [[1, 1, 0], [20, 10, 360]]
};

for (const [index, tuple] of knownTuples.entries()) {
  describe("Known Correspondences " + index, () => {
    const keys = Object.keys(tuple);
    for (let i = 0; i < keys.length; i++) {
      for (let j = 0; j < keys.length; j++) {
        if (i != j) {
          const func = ColorCalculus[keys[i] + "_to_" + keys[j]];
          if (func != null) {
            it(keys[i] + "_to_" + keys[j], () => {
              const r = func(tuple[keys[i]]);
              expectColorEquals(r, tuple[keys[j]]);
            });
          }
        }
      }
    }
  });
}

function inversionCases(from, to, ranges) {
  const rand = mulberry32(0);
  it(from + "_to_" + to, () => {
    const forward = ColorCalculus[from + "_to_" + to];
    const backward = ColorCalculus[to + "_to_" + from];
    for (let iter = 0; iter < 100; iter++) {
      const a = rand() * (ranges[1][0] - ranges[0][0]) + ranges[0][0];
      const b = rand() * (ranges[1][1] - ranges[0][1]) + ranges[0][1];
      const c = rand() * (ranges[1][2] - ranges[0][2]) + ranges[0][2];
      const [ra, rb, rc] = backward(forward(a, b, c));
      const diff = Math.abs(ra - a) + Math.abs(rb - b) + Math.abs(rc - c);
      if (diff > 1.5) {
        throw new Error(
          `|diff=${diff}| > 1e-4 at [${formatColor([
            a,
            b,
            c
          ])}] -> ${formatColor([ra, rb, rc])}`
        );
      }
    }
  });
}

describe("Derivative", () => {
  for (const from of Object.keys(valueRanges)) {
    for (const to of Object.keys(valueRanges)) {
      const name = from + "_to_" + to;
      if (ColorCalculus[name + "_derivative"]) {
        it(name + "_derivative", () => {
          expectDerivativeCorrect(
            ColorCalculus[name],
            ColorCalculus[name + "_derivative"],
            3,
            valueRanges[from][0],
            valueRanges[from][1],
            3
          );
        });
      }
    }
  }
});

describe("Inversion", () => {
  const items = Object.keys(valueRanges);
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items.length; j++) {
      if (i != j) {
        inversionCases(items[i], items[j], valueRanges[items[i]]);
      }
    }
  }
});

describe("CIECAM02", () => {
  it("Roundtrip", () => {
    const m = ColorCalculus.CIECAM02Model(
      96.42,
      100.0,
      82.52,
      100.0,
      20.0,
      "average"
    );
    expectColorEquals(
      m.xyz_to_JCh(28.86602045, 18.41865185, 2.677891918),
      [41.749442, 68.837636, 38.719487],
      0.1
    );
    expectColorEquals(
      m.JCh_to_xyz(41.749442, 68.837636, 38.719487),
      [28.86602045, 18.41865185, 2.677891918],
      0.1
    );
  });
});

describe("version", () => {
  it("correct", () => {
    if (require("../package.json").version != ColorCalculus.version) {
      throw new Error("Version doesn't match");
    }
  });
});

describe("Color API", () => {
  const { color, scale } = ColorCalculus;

  it("Color", () => {
    expectDeepEquals(color("rgba(80%,100%,50%,0.3)").hex(), "#ccff80");
    expectDeepEquals(color("rgb(80%,100%,50%)").hex(), "#ccff80");
    expectDeepEquals(color("rgba(120,100,50,0.3)").hex(), "#786432");
    expectDeepEquals(color("rgb(120,100,50)").hex(), "#786432");
    expectDeepEquals(color("#1f77b4").hex(), "#1f77b4");
    expectDeepEquals(color("#abc").hex(), "#aabbcc");
  });

  it("Scale", () => {
    const s = scale()
      .domain([0, 1])
      .range(["#1f77b4", "#ff7f0e"])
      .mode("lab");
    expectDeepEquals(s(0), "#1f77b4");
    expectDeepEquals(s(1), "#ff7f0e");
  });
});
