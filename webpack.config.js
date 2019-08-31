const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const config = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[hash].js',
        publicPath: 'dist/'
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
                    publicPath: '',
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    publicPath: '',
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
        new ExtractTextPlugin({
            filename: '[name]-[hash].css'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            inject: false,
            minify: {
                collapseWhitespace: true,
                preserveLineBreaks: true
            }
        }),
        new FileManagerPlugin({
            onEnd: {
                move: [
                    {
                        source: './dist/index.html',
                        destination: './index.html'
                    }
                ]
            }
        })
    ],
    devServer: {
        contentBase: __dirname,
        compress: true,
        port: 9000,
        hot: false,
        inline: false
    }
};

if (process.env.NODE_ENV === 'production') {
    config.mode = 'production';
    config.plugins.push(new CleanWebpackPlugin([
        'index.html',
        path.resolve(__dirname, 'dist')
    ]));
    config.plugins.push(new webpack.LoaderOptionsPlugin({
        minimize: true
    }));
}

module.exports = config;
