/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      colors: {
        sky: {
          top:  '#03080f',
          mid:  '#051825',
          glow: '#073d52',
        },
        teal: {
          DEFAULT: '#0a7fa0',
          light:   '#14b8d4',
          dim:     '#0d5470',
        },
        hill: {
          dark: '#060e14',
          mid:  '#091624',
        },
        'text-main':   '#cde8f0',
        'text-dim':    '#6fa8bc',
        'text-bright': '#e8f8ff',
      },
      animation: {
        'fade-up':     'fadeUp 1.4s ease both',
        'wolf-float':  'wolfFloat 6s ease-in-out infinite',
        'scroll-pulse':'scrollPulse 2s ease-in-out infinite',
        'marquee':     'marquee 22s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        wolfFloat: {
          '0%,100%': { transform: 'translateX(-50%) translateY(0)' },
          '50%':     { transform: 'translateX(-50%) translateY(-4px)' },
        },
        scrollPulse: {
          '0%,100%': { opacity: '.4', transform: 'scaleY(1)' },
          '50%':     { opacity: '1',  transform: 'scaleY(1.15)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}