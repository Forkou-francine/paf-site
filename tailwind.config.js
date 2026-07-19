export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display Variable', 'Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
