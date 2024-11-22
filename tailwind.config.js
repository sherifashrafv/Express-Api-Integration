/** @type {import('tailwindcss').Config} */
export default {
  content: ["./public/**/*.css", "./views/**/*.pug"],
  theme: {
    extend: {
      container: {
        padding: "1rem",
        center: true,
      },
    },
  },
  plugins: [],
};
