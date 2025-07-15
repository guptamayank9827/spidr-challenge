import { createTheme } from '@mui/material/styles';

export const brandTheme = createTheme({
  palette: {
    mode: 'dark', // Enable dark mode for Material-UI components
    primary: {
      main: '#56acbd', // The bright cyan-blue from spidr.design logo
      light: '#4392a4',
      dark: '#0099CC',
      contrastText: '#fcfdfd',
    },
    background: {
      default: '#1A1A1A', // Very dark background for the entire page
      paper: '#2A2A2A', // Slightly lighter dark for components/cards
    },
    text: {
      primary: "#fcfdfd", // White text for main content
      secondary: '#E0E0E0', // Lighter gray for secondary text
      disabled: '#A0A0A0',
    },
    divider: '#3A3A3A', // Divider lines
  },
  typography: {
    fontFamily: 'Raleway, sans-serif', // Attempt to use Inter font
    h4: {
        fontWeight: 600, // Make headings extra bold
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          // Custom styles for TextField to match the dark theme
          '& .MuiInputBase-input': {
            color: '#fcfdfd', // Input text color
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#4A4A4A', // Default border color
              borderRadius: '8px', // Rounded corners for inputs
            },
            '&:hover fieldset': {
              borderColor: '#6A6A6A', // Hover border color
            },
            '&.Mui-focused fieldset': {
              borderColor: '#56acbd', // Focus border color
            },
            backgroundColor: '#3A3A3A', // Input background color
          },
          '& .MuiInputLabel-root': {
            color: '#E0E0E0', // Label color
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#56acbd', // Label color when focused
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Rounded corners for buttons
          padding: '12px 24px', // Larger padding for buttons
          fontSize: '1.125rem', // text-lg equivalent
          fontWeight: 600, // font-semibold equivalent
          textTransform: 'none', // Prevent uppercase text
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', // Subtle shadow
          transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)', // Lift effect on hover
            backgroundColor: '#4392a4', // Darker blue on hover
          },
        },
        outlined: {
            '&:hover': {
                color: "#fcfdfd",
                transform: 'translateY(-1px)' // Lift effect on hover
            },
        }
      },
    },
    MuiContainer: {
        styleOverrides: {
            root: {
                padding: '32px 24px', // Equivalent to p-8 md:p-10
            },
        },
    },
    MuiFormLabel: {
        styleOverrides: {
            root: {
                color: "#fcfdfd"
            }
        }
    }
  },
});