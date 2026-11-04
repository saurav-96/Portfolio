import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#06060B',
        midnight: '#0C0D17',
        elevated: '#121426',
        violet: {
          DEFAULT: '#7C3AED',
          light: '#8B5CF6',
        },
        purple: {
          DEFAULT: '#A855F7',
          neon: '#C084FC',
        },
        cyan: {
          DEFAULT: '#06B6D4',
          neon: '#22D3EE',
        },
        indigo: {
          DEFAULT: '#4F46E5',
          neon: '#6366F1',
        },
        emerald: {
          DEFAULT: '#10B981',
          neon: '#34D399',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Space Grotesk', 'Plus Jakarta Sans', '-apple-system', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Fira Code', 'monospace'],
        hand: ['var(--font-hand)', 'Caveat', 'cursive'],
      },
      boxShadow: {
        glass: '0 24px 60px -14px rgba(0, 0, 0, 0.75), inset 0 1px 0 0 rgba(255, 255, 255, 0.14)',
        violet: '0 14px 36px -6px rgba(124, 58, 237, 0.55), 0 0 22px rgba(6, 182, 212, 0.22)',
        cyan: '0 14px 36px -6px rgba(6, 182, 212, 0.45)',
      },
      backdropBlur: {
        glass: '24px',
        heavy: '28px',
      },
    },
  },
  plugins: [],
};

export default config;
