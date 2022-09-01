module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./Views/Templates/_Layout_Template.cshtml",
    "./Views/Home/Index.cshtml",
  ],
  important: true,
  theme: {
    /*
     * Match Bootstrap's Breakpoints
     */
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
    },
    extend: {
      colors: {},
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
};
