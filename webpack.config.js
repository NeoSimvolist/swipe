const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    target: ["web", "es5"],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
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
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: []
};

module.exports = (env, argv) => {
    if (argv.mode === 'production') {
        config.entry = [
            './src/polyfills.js',
            './node_modules/@webcomponents/custom-elements/custom-elements.min.js',
            './src/bundle.ts'
        ];
        config.experiments = {
            outputModule: false
        };
        config.output = {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
            libraryTarget: 'commonjs2'
        };
    } else {
        config.entry = [
            './src/polyfills.js',
            './node_modules/@webcomponents/custom-elements/custom-elements.min.js',
            './src/demo/demo.ts'
        ];
        config.devtool = 'source-map';
        config.devServer = {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            host: '0.0.0.0',
            port: 4201,
            disableHostCheck: true,
            hot: true
        };
        config.plugins.push(new HtmlWebpackPlugin({
            template: 'src/demo/demo.html'
        }));
        config.output = {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        };
    }
    return config;
};
