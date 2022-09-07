const {defineConfig} = require('@vue/cli-service')
const CopyWebpackPlugin = require('copy-webpack-plugin');

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    publicPath: './',
    configureWebpack: {
        module: {
            rules: [// cesium资源文件解析
                {

                    test: /\.js$/,
                    include: /(cesium)/,
                    use: {
                        loader: '@open-wc/webpack-import-meta-loader',
                    }
                }
            ]
        },
        plugins: [
            new NodePolyfillPlugin(),
            new CopyWebpackPlugin({
                patterns: [
                    // 拷贝cesium资源文件，需要用到
                    {
                        from: 'node_modules/cesium/Build/Cesium/Workers',
                        to: 'cesium/Workers',
                    },
                    {
                        from: 'node_modules/cesium/Build/Cesium/ThirdParty',
                        to: 'cesium/ThirdParty',
                    },
                    {
                        from: 'node_modules/cesium/Build/Cesium/Assets',
                        to: 'cesium/Assets',
                    },
                    {
                        from: 'node_modules/cesium/Build/Cesium/Widgets',
                        to: 'cesium/Widgets',
                    },
                ]
            })
        ]
    },
})
