/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary:  '#0A84FF',
        normal:   '#34D399',
        review:   '#FB923C',
        surface:  '#0F1623',
        elevated: '#161F30',
        border:   '#1E2D45',
        base:     '#080D14',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(10, 132, 255, 0.25)',
        'glow-normal':  '0 0 20px rgba(52, 211, 153, 0.25)',
        'glow-review':  '0 0 20px rgba(251, 146, 60, 0.25)',
      },
    },
  },
  plugins: [],
}

