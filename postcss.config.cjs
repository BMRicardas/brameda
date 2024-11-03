module.exports = {
  plugins: {
    "postcss-nesting": {},
    autoprefixer: {},
    cssnano: {
      preset: [
        "default",
        {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    },
  },
};
