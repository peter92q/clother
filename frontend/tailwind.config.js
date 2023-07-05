/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'pattern': "url('https://img.freepik.com/free-vector/abstract-organic-lines-background_1017-26669.jpg?w=1060&t=st=1682952027~exp=1682952627~hmac=b98f2e6b656a08eaf34a68fd1f48477eee89b9093c59a56e5539eb46858417ce')",
      },
    },
  },
  plugins: [],
}