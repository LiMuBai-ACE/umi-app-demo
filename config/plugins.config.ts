//引入
const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// vw适配器
const postcssPx2vw = require('postcss-px-to-viewport');
// 生产环境
const isEnvProduction = process.env.NODE_ENV === 'production';
// 开发环境
const isEnvDevelopment = process.env.NODE_ENV === 'development';
const resolve = (dir: any) => path.join(__dirname, dir);
const assetDir = 'static';
const Version = new Date().getTime();

module.exports = {
    targets: { ie: 11 },
    // 包模块结构分析工具
    analyze: {
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true,
        generateStatsFile: false,
        statsFilename: 'stats.json',
        logLevel: 'info',
        defaultSizes: 'parsed', // stat  // gzip
    },
    chainWebpack: function (config: any) {
        if (isEnvProduction) {
            config.merge({
                plugin: {
                    install: {
                        plugin: require('uglifyjs-webpack-plugin'),
                        args: [{
                            sourceMap: false,
                            uglifyOptions: {
                                compress: {
                                    // 删除所有的 `console` 语句
                                    drop_console: true,
                                },
                                output: {
                                    // 最紧凑的输出
                                    beautify: false,
                                    // 删除所有的注释
                                    comments: false,
                                },
                            }
                        }]
                    }
                },
                optimization: {
                    minimize: true,
                    splitChunks: {
                        chunks: 'all',
                        minSize: 20000,             //生成块的最小大小（以字节为单位）1024字节=1KB。
                        minChunks: 1,               //拆分前必须共享模块的最小块数。
                        maxInitialRequests: 30,     //入口点的最大并行请求数。
                        automaticNameDelimiter: '.',
                        cacheGroups: {
                            vendor: {
                                name: 'vendors',
                                test({ resource }: any) {
                                    return /[\\/]node_modules[\\/]/.test(resource);
                                },
                                priority: 10,
                            },
                        },
                    },
                }
            });
            // 修改js，js chunk文件输出目录
            config.output
                .filename(assetDir + `/js/[name].js`)
                .chunkFilename(assetDir + `/js/[name].js`);
            // 修改css输出目录
            config.plugin('extract-css').tap(() => [
                {
                    filename: `${assetDir}/css/[name].[contenthash:8].css`,
                    chunkFilename: `${assetDir}/css/[name].[contenthash:8].chunk.css`,
                    ignoreOrder: true,
                },
            ]);
            // 修改图片输出目录
            config.module
                .rule('images')
                .test(/\.(png|jpe?g|gif|webp|ico)(\?.*)?$/)
                .use('url-loader')
                .loader(require.resolve('url-loader'))
                .tap((options: any) => {
                    const newOptions = {
                        ...options,
                        name: assetDir + `/img/[name].[hash:8].[ext]`,
                        fallback: {
                            ...options.fallback,
                            options: {
                                name: assetDir + `/img/[name].[hash:8].[ext]`,
                                esModule: false,
                            },
                        },
                    };
                    return newOptions;
                });
            // 修改svg输出目录
            config.module
                .rule('svg')
                .test(/\.(svg)(\?.*)?$/)
                .use('file-loader')
                .loader(require.resolve('file-loader'))
                .tap((options: any) => ({
                    ...options,
                    name: assetDir + `/img/[name].[hash:8].[ext]`,
                }));
            // 修改fonts输出目录
            config.module
                .rule('fonts')
                .test(/\.(eot|woff|woff2|ttf)(\?.*)?$/)
                .use('file-loader')
                .loader(require.resolve('file-loader'))
                .tap((options: any) => ({
                    ...options,
                    name: assetDir + `/fonts/[name].[hash:8].[ext]`,
                    fallback: {
                        ...options.fallback,
                        options: {
                            name: assetDir + `/img/[name].[hash:8].[ext]`,
                            esModule: false,
                        },
                    },
                }));
            config.module
                .rule('exclude')
                .use('url-loader')
                .tap((options: any) => {
                    return {
                        ...options,
                        limit: 1,
                    };
                });
            // 添加gzip压缩
            config.when(isEnvProduction, (config: any) => {
                config
                    .plugin('compression-webpack-plugin')
                    .use(CompressionWebpackPlugin, [
                        {
                            filename: `[path].gz[query]`,
                            algorithm: 'gzip',
                            test: new RegExp('\\.(js|css)$'),
                            threshold: 10240,
                            minRatio: 0.8,
                        },
                    ]);
            });
        }
    },
    extraPostCSSPlugins: [
        postcssPx2vw({
            unitToConvert: "px", // 要转化的单位
            viewportWidth: 375, // UI设计稿的宽度
            unitPrecision: 6, // 转换后的精度，即小数点位数
            propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
            fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: ["wrap"], // 指定不转换为视窗单位的类名，
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
            replace: true, // 是否转换后直接更换属性值
            exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
            landscape: false // 是否处理横屏情况
        }),
    ],
    // 生产环境去除console日志打印
    terserOptions: {
        compress: {
            drop_console: isEnvProduction,
        },
    },
};