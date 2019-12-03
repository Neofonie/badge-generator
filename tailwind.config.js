const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    fontFamily: {
      neo: ['Camingo', 'Tahoma', 'Arial']
    },
    fontSize: {
      base: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '1.75rem',
      '6xl': '4.25rem',
      ...defaultTheme.fontSize
    },
    extend: {
      colors: {
        'neo-black': '#695F5F',
        'neo-blue': '#3D9ACC',
        'neo-grey': '#969191',
        'neo-red': '#E60023'
      },
      screens: {
        print: { raw: 'print' }
        // => @media  print { ... }
      }
    }
  },
  variants: {},
  plugins: [
    function({ addBase, config }) {
      addBase({
        body: {
          color: config('theme.colors.neo-black'),
          fontFamily: config('theme.fontFamily.neo'),
          fontSize: config('theme.fontSize.base'),
          lineHeight: config('theme.lineHeight.none')
        },
        h1: {
          color: config('theme.colors.neo-red'),
          fontSize: config('theme.fontSize.6xl'),
          lineHeight: config('theme.lineHeight.tight')
        },
        h2: {
          color: config('theme.colors.neo-red'),
          fontSize: config('theme.fontSize.xl')
        },
        h3: {
          color: config('theme.colors.neo-red'),
          fontSize: config('theme.fontSize.xl')
        },
        h4: {
          color: config('theme.colors.neo-red'),
          fontSize: config('theme.fontSize.xl')
        },
        h5: {
          color: config('theme.colors.neo-red'),
          fontSize: config('theme.fontSize.2xl')
        },
        a: {
          color: config('theme.colors.neo-blue')
        },
        'a:hover': {
          color: config('theme.colors.neo-red')
        },
        button: {
          fontSize: config('theme.fontSize.xl')
        },
        select: {
          fontSize: config('theme.fontSize.xl')
        }
      });
    },
    function({ addComponents, config }) {
      addComponents({
        '.neo-btn': {
          padding: `${config('theme.spacing.1')} ${config('theme.spacing.3')}`,
          borderRadius: config('theme.borderRadius.default'),
          height: config('theme.spacing.10')
        },
        '.neo-btn--blue': {
          backgroundColor: config('theme.colors.neo-blue'),
          color: config('theme.colors.white'),
          '&:hover': {
            backgroundColor: config('theme.colors.blue.700')
          }
        },
        '.neo-btn--red': {
          backgroundColor: config('theme.colors.neo-red'),
          color: config('theme.colors.white'),
          '&:hover': {
            backgroundColor: config('theme.colors.red.700')
          }
        },
        '.neo-select': {
          backgroundColor: config('theme.colors.gray.200'),
          borderColor: config('theme.colors.neo-grey'),
          borderRadius: config('theme.borderRadius.default'),
          borderWidth: config('theme.borderWidth.default'),
          padding: `${config('theme.spacing.1')} ${config('theme.spacing.2')}`,
          height: config('theme.spacing.10')
        }
      });
    }
  ]
};
