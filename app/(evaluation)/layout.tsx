'use client';

import { useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppStepper from '@/components/AppStepper';

export default function EvaluationLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light'
                }
            }),
        [prefersDarkMode]
    );

    return (
        <ThemeProvider theme={theme}>
            <AppStepper />
            <main>{children}</main>
        </ThemeProvider>
    );
}
