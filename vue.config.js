//如果要修改webpack的相关配置，可以自己新建一个这样的文件，文件名：vue.config.js,到时候会自己去合并
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir) //设置绝对路径
}
module.exports = {
    lintOnSave: true,

    chainWebpack: (config) => {
        config.resolve.alias
            // 第一个参数事别名，第二个参数是路径
            .set('@$', resolve('src'))
            .set('components', resolve('src/components'))
            .set('assets', resolve('src/assets'))
            .set('views', resolve('src/views'))
            .set('common', resolve('src/common'))
            .set('network', resolve('src/network'))
        //store router 没有必要设置别名，默认已经设置
    },

    pluginOptions: {
      'style-resources-loader': {
        preProcessor: 'stylus',
        patterns: [
            path.resolve(__dirname,'./src/assets/css/index.styl')
        ]
      }
    }
}
// module.exports = {
//     configureWebpack:{
//         resolve:{
//             alias:{
//                 'assets': '@/assets',
//                 'common': '@/common',
//                 'components': '@/components',
//                 'network': '@/network',
//                 'views': ''
//             },
            
//         }
//     }
// }
