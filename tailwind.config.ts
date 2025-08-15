/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/widget/*.{js,ts,jsx,tsx}",
    "./src/widget/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    //'space-y-0', 'space-y-1', 'space-y-2', 'space-y-3', 'space-y-4', 'space-y-5', 'space-y-6',
    // add all variants you might use dynamically
  ],
}
