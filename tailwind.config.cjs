/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    extend: {
      colors: {
        "mastodon-gray-900": "#191b22",
        "mastodon-gray-800": "#282c37",
        "mastodon-gray-600": "#393f4f",
        "mastodon-gray-500": "#444b5d"
      }
    },
  },
  plugins: [],
}
