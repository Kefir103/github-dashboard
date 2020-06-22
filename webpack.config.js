const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    entry: ['@babel/polyfill', './src/client/index.js'],
    output: {
        path: path.join(__dirname, 'build'),
        filename: "bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(css|scss)$/,
                loader: [
                    'style-loader', 'css-loader', 'sass-loader'
                ]
            }
        ]
    },
    devServer: {
        port: 3001,
        hot: true,
        open: true,
        contentBase: path.join(__dirname, 'build'),
        compress: false,
        historyApiFallback: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            favicon: "./public/favicon.ico"
        })
    ]
}
