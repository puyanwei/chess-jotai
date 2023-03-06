module.exports = {
  content: [`./src/pages/**/*.{js,ts,jsx,tsx}`, `./src/**/*.{js,ts,jsx,tsx}`],
  theme: {
    extend: {
      gridTemplateRows: {
        8: `repeat(8, minmax(0, 1fr))`,
      },
      gridRowStart: {
        8: `8`,
      },
      screens: {
        xl: `1420px`,
      },
    },
  },
  plugins: [],
}
