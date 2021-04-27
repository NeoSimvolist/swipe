const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
    const outputDir = 'dist';
    const isProduction = argv.mode === 'production';
    const isModule = Boolean(env.module);
    const config = {
        target: ["web", isModule ? 'es2015' : 'es5'],
        output: {
            filename: isModule ? 'esm2015.[name].js' : '[name].js',
            path: path.resolve(__dirname, outputDir)
        },
        experiments: {
            outputModule: isModule
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.(js|ts)$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: isModule ? {esmodules: true} : '> 0.25%, not dead, ie 11'
                                    }
                                ],
                                '@babel/preset-typescript'
                            ],
                            plugins: [
                                ['@babel/plugin-proposal-decorators', {legacy: true}],
                                '@babel/plugin-proposal-class-properties'
                            ]
                        }
                    },
                    exclude: /polyfills\.js/,
                    include: [
                        path.resolve(__dirname, 'node_modules/lit-element'),
                        path.resolve(__dirname, 'node_modules/lit-html'),
                        path.resolve(__dirname, 'src')
                    ]
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        'style-loader',
                        // Translates CSS into CommonJS
                        'css-loader',
                        // Compiles Sass to CSS
                        'sass-loader',
                    ],
                }
            ],
        },
        plugins: []
    };

    if (isModule) {
        config.entry = {
            swipe: {
                import: './src/swipe.ts',
                library: {
                    type: 'module'
                }
            },
        };
    } else {
        config.entry = {
            polyfills: './src/demo/polyfills.js',
            swipe: {
                import: './src/swipe.ts'
            },
            demo: {
                import: './src/demo/demo.ts',
                dependOn: 'swipe'
            }
        };
        config.plugins.push(new HtmlWebpackPlugin({
            template: 'src/demo/demo.html'
        }));
    }

    if (isProduction) return {...config};
    return {
        ...config,
        devtool: 'source-map',
        devServer: {
            contentBase: path.join(__dirname, outputDir),
            compress: true,
            host: '0.0.0.0',
            port: 4201,
            disableHostCheck: true,
            hot: true
        },
    };
};
