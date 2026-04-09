import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-noto)', 'system-ui', 'sans-serif'],
        display: ['var(--font-noto)', 'system-ui', 'sans-serif']
      },
      colors: {
        coral: {
          DEFAULT: '#F26A3E',
          light: '#FF8A5C',
          dark: '#E0561F'
        },
        cream: '#FFF8F0',
        beige: '#FDF0E6',
        ink: '#2D2D2D',
        body: '#5C5C5C',
        pinkbrand: '#F4B6C7',
        bluebrand: '#A9C8E8'
      },
      boxShadow: {
        card: '0 10px 30px -10px rgba(242, 106, 62, 0.18)',
        soft: '0 6px 24px -8px rgba(45, 45, 45, 0.12)'
      },
      borderRadius: {
        card: '24px'
      }
    }
  },
  plugins: []
};

export default config;
