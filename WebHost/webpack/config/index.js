const path = require("path");
const appRoot = require("app-root-path");
const faviconPath = "./src/icons/favicon/*";
const distPath = path.resolve(appRoot.toString(), "wwwroot");
const devServerUrl = "https://localhost";
const devServerPort = 8080;

module.exports = {
  devServerPort: devServerPort,

  app: {
    import: "./src/scripts/app/index.tsx",
    dependOn: ["vendors", "shared"],
  },

  faviconPath: faviconPath,

  vendors: ["react", "react-dom", "react-router-dom", "react-feather", "dayjs"],

  shared: ["formik", "lodash", "bootstrap"],

  distPath: distPath,

  devServerUrl: devServerUrl,

  devServerFullUrl: `${devServerUrl}:${devServerPort}/`,

  siteRoot: "/",

  extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],

  cleanWebpackOptions: {
    cleanOnceBeforeBuildPatterns: [
      "**/*",
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

  commonHtmlWebpackPlugin: {
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
  },

  title: "harrygillingham.xyz",
};
