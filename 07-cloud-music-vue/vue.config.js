const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    //...
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src')).set('@assets', resolve('src/assets'));
    },
    // devServer: {
    //     proxy: {
    //         '/api': {
    //             target: 'http://140.143.128.100:3000', // 设置调用的接口域名和端口号 ( 设置代理目标)
    //             changeOrigin: true,
    //             ws: true, //代理websockets
    //             pathRewrite: {
    //                 '^/api': '', // 这是一个通配符，设置完了之后每个接口都要在前面加上/api（特别注意这一点）
    //             },
    //         },
    //     },
    //     open: true, //是否自动弹出浏览器页面
    //     https: false, //是否使用https协议
    // },
};
