module.exports = function (api: any) {
  return {
    
    plugins: [
      "macros",
      [
        "@babel/plugin-transform-runtime",
        {
          regenerator: true,
        },
      ],
    ],
  };
};
