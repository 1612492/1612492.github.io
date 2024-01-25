import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html}'],
  theme: {
    fontFamily: {
      base: 'Poppins, sans-serif',
    },
    colors: {
      primary: '#22d3ee',
      red: '#991b1b',
      orange: '#9a3412',
      amber: '#92400e',
      lime: '#3f6212',
      green: '#166534',
      emerald: '#065f46',
      teal: '#115e59',
      cyan: '#155e75',
      sky: '#075985',
      blue: '#1e40af',
      indigo: '#3730a3',
      violet: '#5b21b6',
      purple: '#6b21a8',
      fuchsia: '#86198f',
      pink: '#9d174d',
      rose: '#9f1239',
    },
    extend: {
      backgroundColor: {
        main: '#0f172a',
        card: '#1e293b',
      },
      borderColor: {
        main: '#4b5563',
      },
      textColor: {
        heading: '#fff',
        main: '#d1d5db',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/typography')],
} satisfies Config;
