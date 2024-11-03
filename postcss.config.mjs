import autoprefixer from "autoprefixer";
import postcss from "postcss";
import postcssNesting from "postcss-nesting";

const config = {
  plugins: [autoprefixer(), postcssNesting(), postcss()],
};

export default config;
