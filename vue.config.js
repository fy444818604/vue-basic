const webpack = require("webpack");
const path = require("path");
let configScss = require('./style.config')
console.log(process.env.baseUrl);
module.exports = {
	configureWebpack: {
		plugins: [
			new webpack.ProvidePlugin({
				_: "lodash"
			}),
		],
	},
	chainWebpack: (config) => {
		config.resolve.alias
			.set('@', path.resolve(__dirname, './src'));
		const oneOfsMap = config.module.rule('scss').oneOfs.store;
		oneOfsMap.forEach(item => {
			item
				.use('sass-resources-loader')
				.loader('sass-resources-loader')
				.options({
					resources: './src/config.scss',
				})
				.end()
		})
	},
	lintOnSave: true,
	productionSourceMap: false,
	devServer: {
		compress: true,
		open: true
	},
};
