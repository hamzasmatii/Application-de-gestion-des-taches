module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}", // Include all files in the `pages` directory
    "./src/components/**/*.{js,ts,jsx,tsx}", // Include all files in the `components` directory (if you have one)
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1DA1F2", // Example custom color (Twitter blue)
        secondary: "#14171A", // Example custom color
      },
      fontFamily: {
        sans: ['"Open Sans"', "sans-serif"], // Example custom font
      },
    },
  },
  plugins: [],
};
