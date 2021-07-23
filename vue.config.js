const ManifestPlugin = require("webpack-manifest-plugin");
const nodeExternals = require("webpack-node-externals");

exports.chainWebpack = webpackConfig => {
  webpackConfig.plugins.delete("hmr");
  webpackConfig.plugins.delete("preload");
  webpackConfig.plugins.delete("prefetch");
  webpackConfig.plugins.delete("progress");
  webpackConfig.plugins.delete("friendly-errors");

  if (process.env.SSR_TARGET === "client") {
    webpackConfig
      .entry("app")
      .clear()
      .add("./src/entry-client.js");
  } else {
    webpackConfig
      .entry("app")
      .clear()
      .add("./src/entry-server.js");

    webpackConfig.target("node");
    webpackConfig.output.libraryTarget("commonjs2");

    webpackConfig
      .plugin("manifest")
      .use(new ManifestPlugin({ fileName: "ssr-manifest.json" }));

    webpackConfig.externals(
      nodeExternals({
        allowlist: [/\.(css|vue)$/, /vue-instantsearch/, /instantsearch\.js/]
      })
    );

    webpackConfig.optimization.splitChunks(false).minimize(false);
  }

  // console.log(webpackConfig.toConfig())
};
