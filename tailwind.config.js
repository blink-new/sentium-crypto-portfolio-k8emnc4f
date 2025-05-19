module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'header': {
          bg: '#ffffff',
          border: 'rgba(0, 102, 255, 0.2)',
          text: '#1a1b1e',
          'text-active': '#0066ff',
        },
        'swap': {
          bg: 'rgba(0, 102, 255, 0.05)',
          border: 'rgba(0, 102, 255, 0.2)',
          text: '#1a1b1e',
        },
        'popup': {
          bg: '#ffffff',
          border: 'rgba(0, 102, 255, 0.2)',
          text: '#1a1b1e',
          label: '#0066ff',
        },
        'input': {
          bg: 'rgba(0, 102, 255, 0.05)',
          border: 'rgba(0, 102, 255, 0.2)',
          text: '#1a1b1e',
          placeholder: 'rgba(26, 27, 30, 0.5)',
        },
        'button': {
          'primary': {
            bg: '#0066FF',
            hover: '#0052CC',
          },
          'secondary': {
            bg: 'rgba(0, 102, 255, 0.05)',
            border: 'rgba(0, 102, 255, 0.2)',
          },
          text: '#1a1b1e',
        },
        divider: 'rgba(0, 102, 255, 0.2)',
        status: {
          success: '#40B66B',
          error: '#FF3B3B',
          warning: '#FFBE58',
          info: '#0066FF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        kanit: ['Kanit', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'heading-1': ['48px', { lineHeight: '56px', fontWeight: '700' }],
        'heading-2': ['40px', { lineHeight: '48px', fontWeight: '700' }],
        'heading-3': ['32px', { lineHeight: '40px', fontWeight: '700' }],
        'heading-4': ['24px', { lineHeight: '32px', fontWeight: '700' }],
        'heading-5': ['20px', { lineHeight: '28px', fontWeight: '700' }],
        'heading-6': ['16px', { lineHeight: '24px', fontWeight: '700' }],
        'body-large': ['18px', { lineHeight: '28px' }],
        'body-base': ['16px', { lineHeight: '24px' }],
        'body-small': ['14px', { lineHeight: '20px' }],
        'caption': ['12px', { lineHeight: '16px' }],
      },
      opacity: {
        '15': '0.15',
        '35': '0.35',
        '45': '0.45',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        'pencil-push': {
          '0%': { transform: 'translateX(100%) scale(0.1)' },
          '100%': { transform: 'translateX(0) scale(1)' }
        },
        'pencil-pull': {
          '0%': { transform: 'translateX(0) scale(1)' },
          '100%': { transform: 'translateX(100%) scale(0.1)' }
        },
        'slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        'slide-out': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        },
        'spin': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        'pencil-push': 'pencil-push 0.3s ease-out forwards',
        'pencil-pull': 'pencil-pull 0.3s ease-in forwards',
        'slide-in': 'slide-in 0.2s ease-out forwards',
        'slide-out': 'slide-out 0.2s ease-in forwards',
        'slide-up': 'slide-up 0.3s ease-out forwards',
        'spin': 'spin 0.5s linear'
      }
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
};