import resolve from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import summary from 'rollup-plugin-summary';
import commonjs from '@rollup/plugin-commonjs';
import sourcemaps from 'rollup-plugin-sourcemaps'

export default {
    input: ['dist/grid.js'],
    plugins: [
        resolve(),
        commonjs(),
        sourcemaps(),
        terser({
            ecma: 2020,
            module: true,
            warnings: true,
        }),
        summary()
    ],
    external: ['debounce'],
    output: {
        file: 'dist/grid.bundled.js',
        format: 'esm'
    }
};
