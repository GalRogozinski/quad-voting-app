/** @type {import('next').NextConfig} */
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const nodeExternals = require("webpack-node-externals")

const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
