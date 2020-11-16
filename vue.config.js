const webpack = require("webpack");
const path = require("path");

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
			.set('@', path.resolve(__dirname, './src'))
	},
	lintOnSave: true,
	productionSourceMap: false,
	devServer: {
		compress: true,
		open: true
	},
};
