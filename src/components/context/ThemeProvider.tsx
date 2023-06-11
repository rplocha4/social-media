import React from 'react';

const ThemeContext = React.createContext({
  theme: 'dark',
  toggleTheme: () => {
    console.log('toggleTheme not implemented');
  },
});

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
