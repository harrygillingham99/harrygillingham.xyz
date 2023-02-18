const path = require("path");
const appRoot = require("app-root-path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const faviconPath = "./src/icons/favicon/*";
const distPath = path.resolve(appRoot.toString(), "wwwroot");
const devServerUrl = "https://localhost";
const devServerPort = 8080;
const devServerFull = `${devServerUrl}:${devServerPort}/`;
const pageTitle = "harrygillingham.xyz";

module.exports = {
  devServerPort: devServerPort,

  app: {
    import: "./src/scripts/app/index.tsx",
    dependOn: ["vendors", "shared"],
  },

  admin: {
    import: "./src/scripts/app/admin.tsx",
    dependOn: ["vendors", "shared"],
  },

  faviconPath: faviconPath,

  vendors: ["react", "react-dom", "react-router-dom", "react-feather", "dayjs"],

  shared: ["formik", "lodash", "bootstrap", "react-markdown"],

  distPath: distPath,

  devServerUrl: devServerUrl,

  devServerFullUrl: devServerFull,

  siteRoot: "/",

  extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],

  cleanWebpackOptions: {
    cleanOnceBeforeBuildPatterns: [
      "**/*",
      path.join(appRoot.toString(), "Views", "Shared", "_Layout.cshtml"),
      path.join(appRoot.toString(), "Views", "Shared", "_Layout_Admin.cshtml"),
      path.join(appRoot.toString(), "Views", "Shared", "_Layout.cshtml"),
    ],
    verbose: true,
  },

  copyOptions: {
    patterns: [
      {
        from: faviconPath,
        to: path.join(distPath, "favicon/[name][ext]"),
        noErrorOnMissing: true,
      },
    ],
  },

  getHtmlWebpackPlugins: (dev, dev_serve) => [
    new HtmlWebpackPlugin({
      filename: path.join(
        appRoot.toString(),
        "Views",
        "Shared",
        "_Layout.cshtml"
      ),
      template: path.join(
        appRoot.toString(),
        "Views",
        "Templates",
        "_Layout_Template.cshtml"
      ),
      inject: false,
      minify: false,
      title: `${dev ? "DEV | " : ""}${pageTitle}`,
      devServer: dev_serve ? devServerFull : false,
      alwaysWriteToDisk: true,
      verbose: true,
      excludeChunks: ["admin"],
    }),
    new HtmlWebpackPlugin({
      filename: path.join(
        appRoot.toString(),
        "Views",
        "Shared",
        "_Layout_Admin.cshtml"
      ),
      template: path.join(
        appRoot.toString(),
        "Views",
        "Templates",
        "_Layout_Template.cshtml"
      ),
      inject: false,
      minify: false,
      title: `${dev ? "DEV | " : ""}${pageTitle}`,
      devServer: dev_serve ? devServerFull : false,
      alwaysWriteToDisk: true,
      verbose: true,
      excludeChunks: ["app"],
    }),
  ],

  title: pageTitle,
};
