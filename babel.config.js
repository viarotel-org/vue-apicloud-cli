const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

const plugins = [
  [
    "import",
    {
      libraryName: "vant",
      libraryDirectory: "es",
      style: true
    },
    "vant"
  ]
];
if (isProduction) {
  plugins.push("transform-remove-console") // 生产环境移除console
}

module.exports = {
  plugins,
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
};