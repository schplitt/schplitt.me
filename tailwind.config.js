import { scopedPreflightStyles, isolateOutsideOfContainer } from 'tailwindcss-scoped-preflight';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,vue,ts}",

    ],
    theme: {
      extend: {},
    },
    plugins: []
  }