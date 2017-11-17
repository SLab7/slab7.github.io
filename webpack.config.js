const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

var config = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('precss'),
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        },
                        {
                            loader: 'sass-loader' // compiles Sass to CSS
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
            'Tether': 'tether'
        }),
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            inject: false,
            minify: {
                collapseWhitespace: true,
                preserveLineBreaks: true
            }
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        hot: false,
        inline: false
    }
};

if (process.env.NODE_ENV === 'production') {
    config.devtool = 'source-map';
    config.plugins.push(new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]));
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
            warnings: true
        }
    }));
    config.plugins.push(new webpack.LoaderOptionsPlugin({
        minimize: true
    }));
}

module.exports = config;
