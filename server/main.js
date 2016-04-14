import Koa from 'koa'
import convert from 'koa-convert'
import webpack from 'webpack'
import webpackConfig from '../build/webpack.config'
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'
import historyApiFallback from 'koa-connect-history-api-fallback'
import serve from 'koa-static'
//import proxy from 'koa-proxy'
import _debug from 'debug'
import config from '../config'

const debug = _debug('app:server')
const paths = config.utils_paths
const app = new Koa()


// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig)

  // Enable webpack-dev and webpack-hot middleware
  const { publicPath } = webpackConfig.output

  app.use(devMiddleware(compiler, {
    publicPath,
    contentBase: paths.base(config.dir_client),
    hot: true,
    quiet: config.compiler_quiet,
    noInfo: config.compiler_quiet,
    lazy: false,
    stats: config.compiler_stats
  }))
  app.use(hotMiddleware(compiler))

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(serve(paths.client('static')))
} else {
  debug(
    'Server is being run outside of live development mode. This starter kit ' +
    'does not provide any production-ready server functionality. To learn ' +
    'more about deployment strategies, check out the deployment section ' +
    'in the README.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(serve(paths.base(config.dir_dist)))
}

export default app
