import { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  return (
    <AlertContext.Provider value={{ alertVisible, alertMessage, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
