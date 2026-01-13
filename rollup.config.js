const pkg = require("./package.json")
const pluginNodeResolve = require("@rollup/plugin-node-resolve")
const pluginCommonjs = require("@rollup/plugin-commonjs")

module.exports = {
    input: "./src/index.js",
    output: {
        name: 'testjs',
        file: "./dist/test.js",
        format: "umd",
        banner: `/*!
 * @oipage/testjs v${pkg.version}
 * git+https://github.com/oi-contrib/oipage-testjs.git
 */`
    },
    plugins: [pluginCommonjs(), pluginNodeResolve()]
}
