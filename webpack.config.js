const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.jsx',
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|eps)$/i,
                use: ['file-loader']
            }
        ]
    },
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, 'src'), path.resolve(__dirname, 'src/components')],
        extensions: ['*', '.js', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'template', 'index.html'),
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        historyApiFallback: true,
        hot: true,
        port: 3000
    }
}