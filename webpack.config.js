const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const DotEnv = require("dotenv-webpack");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true,
    },
    mode: 'production',
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
        new DotEnv(),
    
    ],
    optimization: {
        minimize: true,
        minimizer: [
          `...`,
          new CssMinimizerPlugin(),
        ],
      },
}