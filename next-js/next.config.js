/** @type {import('next').NextConfig} */
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const nodeExternals = require("webpack-node-externals")

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.node$/,
      loader: "node-loader",
    })
    // config.plugins.push(new NodePolyfillPlugin())
    // config.externalsPresets = { node: true }
    // config.externals = [nodeExternals()]
    // config.node = { __dirname: false }
    config.resolve.alias["@sentry/node"] = "@sentry/browser"
    config.resolve.modules.concat(["node_modules"])
    config.resolve.fallback = {
      fs: false,
      stream: false,
      crypto: false,
      os: false,
      readline: false,
      ejs: false,
      assert: require.resolve("assert"),
      path: false,
      process: false,
      require: false,
    }

    return config
  },
}

const nodeLoader = {
  target: "node",
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.node$/,
        loader: "node-loader",
      },
    ],
  },
}

module.exports = nextConfig
