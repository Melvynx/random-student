/* eslint-disable @typescript-eslint/naming-convention */
import type { PaletteOptions } from '@mui/material';
import { createTheme, responsiveFontSizes } from '@mui/material';

const palette: PaletteOptions = {
  mode: 'dark',
};

const createBaseTheme = () => {
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
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {},
        },
      },
    },
  });
};

export const theme = responsiveFontSizes(createBaseTheme());
