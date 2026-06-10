'use client';

import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#111827',
        },
        secondary: {
            main: '#f3f4f6',
        },
        background: {
            default: '#ffffff',
            paper: '#f9fafb',
        },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '8px',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
    },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
    return (
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}
