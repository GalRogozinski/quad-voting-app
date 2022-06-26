/** @type {import('next').NextConfig} */
const nodeExternals = require("webpack-node-externals")

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.node$/,
      loader: "node-loader",
    })
    config.externals = [nodeExternals()]
    // config.node = { __dirname: false }
    config.resolve.alias["@sentry/node"] = "@sentry/browser"
    config.resolve.modules.concat(["node_modules"])

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
