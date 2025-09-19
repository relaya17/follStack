import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const theme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#1976d2',
        primaryContainer: '#e3f2fd',
        secondary: '#ff4081',
        secondaryContainer: '#fce4ec',
        tertiary: '#ff9800',
        surface: '#ffffff',
        surfaceVariant: '#f5f5f5',
        background: '#fafafa',
        error: '#f44336',
        onPrimary: '#ffffff',
        onSecondary: '#ffffff',
        onSurface: '#212121',
        onBackground: '#212121',
        outline: '#e0e0e0',
    },
    fonts: {
        ...MD3LightTheme.fonts,
        bodyLarge: {
            ...MD3LightTheme.fonts.bodyLarge,
            fontFamily: 'Heebo',
        },
        bodyMedium: {
            ...MD3LightTheme.fonts.bodyMedium,
            fontFamily: 'Heebo',
        },
        headlineLarge: {
            ...MD3LightTheme.fonts.headlineLarge,
            fontFamily: 'Heebo',
        },
        headlineMedium: {
            ...MD3LightTheme.fonts.headlineMedium,
            fontFamily: 'Heebo',
        },
        titleLarge: {
            ...MD3LightTheme.fonts.titleLarge,
            fontFamily: 'Heebo',
        },
    },
};

export const darkTheme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: '#42a5f5',
        primaryContainer: '#1565c0',
        secondary: '#ff4081',
        secondaryContainer: '#ad1457',
        tertiary: '#ff9800',
        surface: '#121212',
        surfaceVariant: '#1e1e1e',
        background: '#0f0f0f',
        error: '#f44336',
        onPrimary: '#000000',
        onSecondary: '#000000',
        onSurface: '#ffffff',
        onBackground: '#ffffff',
        outline: '#424242',
    },
};
