import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const babelConfig = { presets: ["@babel/env"] };

export default [
  {
    input: "src/main.js",
    output: {
      name: "ColorCalculus",
      file: "dist/color-calculus.umd.js",
      format: "umd"
    },
    plugins: [babel(babelConfig), terser()]
  },
  {
    input: "src/main.js",
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" }
    ],
    plugins: [terser()]
  }
];
