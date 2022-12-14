const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpackConfig = {
    entry: path.resolve(__dirname, "src", "index.js"),
    output: {
        filename: "[name].[contenthash].bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    module: {
        rules: [{
                test: /\.js/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset"
            }
            
        ]
    },

    plugins:[
        new HtmlWebpackPlugin({title:"vanillaJS app", template:path.resolve(__dirname, "src", "index.html")})
    ],
    optimization:{
        splitChunks:{
            cacheGroups:{
                node_cendors:{
                    name:"vendor",
                    test:/[\\/]node_modules[\\/]/,
                    chunks:"all",
                    priority:1
                }
            }
        }
    },
    devtool: "inline-source-map",
    devServer: {
        static:{
            directory: path.resolve(__dirname,"dist")
        }
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }   ,
    mode: "production"
};

module.exports = webpackConfig;