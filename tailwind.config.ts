import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        login: {
          '0%': {
            opacity: '1',
            transform: 'translateY(0)',
            'border-radius': '0',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(-75rem) rotate(600deg)',
            'border-radius': '50%',
          },
        },
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': (value) => {
            return {
              'animation-delay': value,
            };
          },
        },
        {
          values: theme('transitionDelay'),
        },
      );
    }),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-duration': (value) => {
            return {
              'animation-duration': value,
            };
          },
        },
        {
          values: theme('transitionDuration'),
        },
      );
    }),
  ],
} satisfies Config;
