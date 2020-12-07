const { colors, styleData } = require("./utils");

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: [
      "./src/pages/**/*.vue",
      "./src/components/**/*.vue",
      "./vue.config.js",
    ],
    options: {
      whitelist: ["html", "body", "ol", "ul"],
      whitelistPatterns: [/^v-/, /^a-/, /^el-/, /^swiper-/],
      whitelistPatternsChildren: [
        /^v-/,
        /^a-/,
        /^el-/,
        /^swiper-/,
        /^token/,
        /^pre/,
        /^code/,
      ],
    },
  },
  important: false,
  prefix: "",
  corePlugins: {
    // preflight: false,
  },
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      fontSize: {
        "3xs": "0.125rem",
        "2xs": "0.5rem",
      },
      flexGrow: {
        // '2': '2'
        ...styleData("$:$", 2, 10),
      },
      borderRadius: {
        // 'px-5': '5px'
        ...styleData("px-$:$px", 5, 25, 1, 5),
      },
      spacing: {
        // 'px-2': '2px',
        ...styleData("px-$:$px", 2, 10),

        // '1': '0.25rem',
        ...styleData("$:$rem", 1, 10, 0.25),

        // '12': '3rem'
        ...styleData("$:$rem", 12, 300, 0.25, 2),
      },
      inset: {
        "1/2": "50%",
        "-1/2": "-50%",
      },
      backgroundSize: {
        // 'w-1': '0.25rem auto',
        ...styleData("w-$:$rem 100%", 1, 10, 0.25),
        // 'w-12': '3rem auto',
        ...styleData("w-$:$rem 100%", 12, 100, 0.25, 2),

        // 'h-1': 'auto 0.25rem',
        ...styleData("h-$:100% $rem", 1, 10, 0.25),
        // 'h-12': 'auto 3rem'
        ...styleData("h-$:100% $rem", 12, 100, 0.25, 2),

        "w-full": "100% auto",
        "h-full": "auto 100%",
        full: "100% 100%",
      },
      //字体阴影 text-shadow-xs
      textShadow: {
        none: "none",
        default: "0px 0px 1px rgb(0 0 0 / 20%), 0px 0px 1px rgb(1 0 5 / 10%)",
        sm: "1px 1px 3px rgb(36 37 47 / 25%)",
        md: "0px 1px 2px rgb(30 29 39 / 19%), 1px 2px 4px rgb(54 64 147 / 18%)",
        lg: "3px 3px 6px rgb(0 0 0 / 26%), 0 0 5px rgb(15 3 86 / 22%)",
        xl: "1px 1px 3px rgb(0 0 0 / 29%), 2px 4px 7px rgb(73 64 125 / 35%)",
        "2xl": "1px 1px 5px rgb(33 34 43 / 20%)",
        "3xl": "0 0 3px rgba(0, 0, 0, .8), 0 0 5px rgba(0, 0, 0, .9)",
      },
      //文字截断 .clamp-1
      lineClamp: {
        ...styleData("$:$", 1, 5),
      },
    },
  },
  variants: {
    // lineClamp: ["responsive"],
    // display: ['responsive', 'hover'],
    // whitespace: ['responsive'],
    // wordBreak: ['responsive'],
  },
  plugins: [
    require("tailwindcss-textShadow"), //文字阴影
    require("tailwindcss-line-clamp"), //文字截断
  ],
};
