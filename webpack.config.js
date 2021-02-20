const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FilterPlugin = require('filter-webpack-plugin');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled Postcss, autoprefixer and precss for you. This allows your app
 * to lint  CSS, support variables and mixins, transpile future CSS syntax,
 * inline images, and more!
 *
 * To enable SASS or LESS, add the respective loaders to module.rules
 *
 * https://github.com/postcss/postcss
 *
 * https://github.com/postcss/autoprefixer
 *
 * https://github.com/jonathantneal/precss
 *
 */

const autoprefixer = require('autoprefixer');
const tailwind = require('tailwindcss');
const precss = require('precss');

/*
 * We've enabled MiniCssExtractPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/mini-css-extract-plugin
 *
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/*
 * We've enabled TerserPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/terser-webpack-plugin
 *
 */

const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    './src/index.html'
  ],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

const config = fs.readFileSync('./src/config/config.json', { encoding: 'utf-8' });
const rules = fs.readFileSync('./src/config/rules.json', { encoding: 'utf-8' });

const configString = config
  .replace(/(\r\n|\n|\r|\t|\s\s\s\s|\s\s)/gm, "")
  .replace(/(\\)/gm, "\\\\")
  .replace(/(\": )/gm, "\":");


// add additional configs?
const config_silent = fs.readFileSync('./src/config/config_silent.json', { encoding: 'utf-8' });
const config_silentString = config_silent
  .replace(/(\r\n|\n|\r|\t|\s\s\s\s|\s\s)/gm, "")
  .replace(/(\\)/gm, "\\\\")
  .replace(/(\": )/gm, "\":");

const rulesString = rules
  .replace(/(\r\n|\n|\r|\t|\s\s\s\s|\s\s)/gm, "")
  .replace(/(\\)/gm, "\\\\")
  .replace(/(\": )/gm, "\":");

module.exports = {
  mode: 'development',

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new CopyPlugin({
      patterns: [
        'node_modules/workbox-sw/build/workbox-sw.js'
      ]
    }),
    new MiniCssExtractPlugin({ filename: 'main.[chunkhash].css' }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new FilterPlugin({
      files: [
        'main.js.LICENSE.txt'
      ]
    }),
    new WebpackPwaManifest({
      name: 'NinjaFirewall Config',
      short_name: 'NinjaFirewall Config',
      description: 'Get a default NinjaFirewall configuration',
      start_url: 'https://danielruf.github.io/ninjafirewall-config-browser/',
      background_color: '#ffffff',
      crossorigin: null, //can be null, use-credentials or anonymous
      icons: [{
        src: path.resolve('src/logo.png'),
        sizes: [96, 128, 192, 250] // multiple sizes
      }]
    }),
    new workboxPlugin.GenerateSW({
      swDest: 'sw.js',
      inlineWorkboxRuntime: false,
      importScripts: ['workbox-sw.js'],
      clientsClaim: true,
      skipWaiting: false,
    })
  ],

  module: {
    rules: [
      {
        test: /index\.js$/,
        loader: 'string-replace-loader',
        options: {
          search: '###CONFIG###',
          replace: configString,
        }
      },
      {
        test: /index\.js$/,
        loader: 'string-replace-loader',
        options: {
          search: '###CONFIG_SILENT###',
          replace: config_silentString,
        }
      },
      {
        test: /index\.js$/,
        loader: 'string-replace-loader',
        options: {
          search: '###RULES###',
          replace: rulesString,
          flags: 'g',
        }
      },
      {
        test: /.(js|jsx)$/,
        include: [],
        loader: 'babel-loader'
      }, {
        test: /.css$/,

        use: [{
          loader: MiniCssExtractPlugin.loader
        }, {
          loader: "css-loader",

          options: {
            importLoaders: 1,
            sourceMap: true
          }
        }, {
          loader: "postcss-loader",

          options: {
            postcssOptions: {
              plugins: [
                tailwind,
                precss,
                autoprefixer,
                purgecss
              ]
            }
          }
        }]
      }]
  },

  optimization: {
    minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],

    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  }
}