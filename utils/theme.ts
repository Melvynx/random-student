import { createTheme, PaletteOptions, responsiveFontSizes } from '@mui/material';

// const PRIMARY = '#8FACE4';
// const SECONDARY = '#5d536b';

const palette: PaletteOptions = {
  mode: 'dark',
  // primary: {
  //   main: PRIMARY,
  // },
  // secondary: {
  //   main: SECONDARY,
  // },
  // background: {
  //   default: '#0f131a',
  //   paper: '#1a1d24',
  // },
};

function createBaseTheme() {
  return createTheme({
    palette,
    typography: {
      fontFamily: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Open Sans',
        'Helvetica Neue',
        'sans-serif',
      ].join(','),
      h3: {
        fontFamily: 'Work Sans',
        fontSize: 44,
      },
    },
    spacing: 8,
  });
}

const theme = responsiveFontSizes(createBaseTheme());

export default theme;
