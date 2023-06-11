import React from 'react';

const ShowInfoContext = React.createContext({
  showInfo: false,
  displayInfo: ({ message, color }: { message: string; color: string }) => {
    console.log('displayInfo not implemented' + message + color);
  },
  infoMessage: '',
  color: 'green',
});

export const useShowInfo = () => React.useContext(ShowInfoContext);

function ShowInfoProvider({ children }: { children: React.ReactNode }) {
  const [showInfo, setShowInfo] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [color, setColor] = React.useState('green');

  const displayInfo = ({
    message,
    color,
  }: {
    message: string;
    color: string;
  }) => {
    setColor(color);
    setMessage(message);
    setShowInfo(true);
    setTimeout(() => {
      setShowInfo(false);
    }, 3000);
  };

  return (
    <ShowInfoContext.Provider
      value={{ showInfo, displayInfo, infoMessage: message, color }}
    >
      {children}
    </ShowInfoContext.Provider>
  );
}

export default ShowInfoProvider;
