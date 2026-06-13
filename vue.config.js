module.exports = {
  transpileDependencies: ["body-parser"],
  devServer: {
    port: 8080,
    host: "0.0.0.0",
    allowedHosts: "all",
    client: {
      webSocketURL: "auto://0.0.0.0:0/ws",
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@components": "src/components",
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        options.parserOptions = {
          parser: "babel-eslint",
        };
        return options;
      });
  },
};
