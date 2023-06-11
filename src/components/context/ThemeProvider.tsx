import React from 'react';

const ThemeContext = React.createContext({
  theme: 'dark',
  toggleTheme: () => {
    console.log('toggleTheme not implemented');
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => React.useContext(ThemeContext);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = React.useState('dark');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
