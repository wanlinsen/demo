const CompressionPlugin = require('compression-webpack-plugin')//Gizp压缩
const path = require('path')
module.exports = {
    chainWebpack: config => {
        // #region svg-config
        const svgRule = config.module.rule("svg");
          svgRule.uses.clear();
          svgRule
          .use("svg-sprite-loader")
          .loader("svg-sprite-loader")
          .options({
              symbolId: "icon-[name]"
           });
         },
        }
        // #endregion svg-config

        if (process.env.NODE_ENV === 'production') {
            // #region 图片压缩
            config.module
                .rule('images')
                .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
                .exclude
                .add(path.resolve('src/icons/svg'))
                .end()
                .use('img-loader')
                .loader('img-loader').options({
                    plugins: [
                        require('imagemin-jpegtran')(),
                        require('imagemin-pngquant')({
                            quality: [0.75, 0.85]
                        })
                    ]
                })
            // #endregion
            // #region 启用GZip压缩
            config
                .plugin('compression')
                .use(CompressionPlugin, {
                    asset: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8,
                    cache: true
                })
                .tap(args => { })
        }
    
