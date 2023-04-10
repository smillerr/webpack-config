const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const CopyPlugin = require('copy-webpack-plugin');
// Optimization not needed const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const DotEnv = require("dotenv-webpack");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
    },
    mode: 'development',
    devtool: 'source-map',
    resolve: {
        extensions: ['.js'],
        //This is a way of simplifying the routes in our proyects using something called alliases 
        alias: {
            '@utils': path.resolve(__dirname , 'src/utils/'),
            '@images': path.resolve(__dirname , 'src/assets/images/'),
            '@templates': path.resolve(__dirname , 'src/templates/'),
            '@styles': path.resolve(__dirname , 'src/styles/'),
            '@fonts': path.resolve(__dirname , 'src/assets/fonts/'),
        },
    },
    module: {
        rules: [
            //Javascript files
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            //CSS files
            {
                test: /\.s?css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader" , "sass-loader"]
                
            }, 
            //Image files
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
                generator: {
                    filename: 'assets/images/[hash][ext][query]'
                }
            },
            //Font files
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    filename: 'assets/fonts/[hash][ext][query]'
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'

        }),
        /*new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname , "src" , "assets/images"),
                to: "assets/images",
            }]
        }),*/
        new DotEnv(),
        new BundleAnalyzerPlugin(),
    
    ],
    /* Since we are on dev mode we do not need to optimize our files, we just want to make sure everything is working
    optimization: {
        minimize: true,
        minimizer: [
          `...`,
          new CssMinimizerPlugin(),
        ],
      },
      */
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3006,
        open: true,
    }
}