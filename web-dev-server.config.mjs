import {legacyPlugin} from '@web/dev-server-legacy';
import commonjs from '@rollup/plugin-commonjs';
import {fromRollup} from '@web/dev-server-rollup';
import {hmrPlugin} from '@web/dev-server-hmr';

/** Use Hot Module replacement by adding --hmr to the start command */
const hmr = process.argv.includes('--hmr');

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
    output: {dir: 'dist'},
    nodeResolve: true,
    open: '/demo/',
    watch: !hmr,

    /** Set appIndex to enable SPA routing */
    appIndex: 'demo/index.html',

    plugins: [
        /** Use Hot Module Replacement by uncommenting. Requires @open-wc/dev-server-hmr plugin */
        // hmr && hmrPlugin({ exclude: ['**/*/node_modules/**/*'], presets: [presets.litElement] }),
        fromRollup(commonjs)({
            // TODO неудобно указывать относительный путь до файла, нужно стремиться к "node_modules/debounce/**.js"
            include: ['**/debounce/**.js'],
            transformMixedEsModules: true
        }),
        hmrPlugin(),
        legacyPlugin({
            polyfills: {
                // coreJs: true,
                // regeneratorRuntime: 'always',
                // fetch: true,
                webcomponents: true,
                // shadyCssCustomStyle: true,
                custom: [
                    {
                        name: 'lit-polyfill-support',
                        // TODO неудобно указывать относительный путь до файла, нужно стремиться к "node_modules/lit/polyfill-support.js"
                        path: 'node_modules/lit/polyfill-support.js',
                        test: "!('attachShadow' in Element.prototype)",
                        module: false,
                    },
                ],
            }
        })
    ]
});
