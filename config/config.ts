import { defineConfig } from 'umi';

export default defineConfig({
    title: '协进',
    favicon: 'https://immisso-upload.oss-cn-hangzhou.aliyuncs.com/20200517/rc-upload-1589714215963-2.png',
    outputPath: '/dist', // 修改打包路径
    publicPath: '/',
    manifest: {
        basePath: '/',
    },
    dva: {
        immer: true, // 表示是否启用 immer 以方便修改 reducer
        hmr: true, // 表示是否启用 dva model 的热更新
    },
    hash: true, // 开启哈希模式 生产文件后缀名带有哈希值 避免浏览器缓存
    history: { type: 'browser' },
    antd: {
        dark: true, // 主题背景
        compact: true, // 紧凑
    },
    // antd mobile
    extraBabelPlugins: [
        [
            'import',
            {
                libraryName: 'antd-mobile',
                style: true,
            },
        ],
    ],
    devtool: false, // devtool: 'source-map',//生成map文件 devtool: 'eval',
    ignoreMomentLocale: true,
    nodeModulesTransform: { type: 'none', },
    // 按需加载
    dynamicImport: {
        loading: '@/components/PageLoading/index',
    },
    // 生成meta标签
    metas: [
        {
            name: 'description',
            content: '协进教育'
        },
        {
            name: 'keywords',
            content: '协进教育,上海协进,协进大学'
        },
    ],
    // 路由
    ...require('./router.config'),
    // webpack配置
    ...require('./plugins.config')
});
