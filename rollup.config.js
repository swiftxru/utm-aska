import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import {terser} from "rollup-plugin-terser";
import pkg from "./package.json";

export default [
    {
        input: "src/index.js",
        output: {
            name: "utmAska",
            file: pkg.browser,
            format: "umd",
            esModule: false,
            exports: "named",
            sourcemap: true,
        },
        plugins: [
            resolve(),
            commonjs(),
            babel({
                exclude: ["node_modules/**"],
            }),
            terser({
                format: {
                    comments: false
                },
                compress: true
            }),
        ],
    },
    {
        input: "src/index.js",
        output: [
            {
                file: pkg.module, format: "esm",
                exports: "auto"
            },
            {
                file: pkg.main, format: "cjs",
                exports: "auto"
            },
        ],
        plugins: [
            resolve(),
            terser({
                format: {
                    comments: false
                },
                compress: true
            }),
            babel({
                exclude: ["node_modules/**"],
            }),
        ],
    },
];