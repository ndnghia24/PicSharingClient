// src/components/FloatingAlert.js
import React from 'react';
import { Alert } from 'antd';
import { useAlert } from '../contexts/AlertContext';

const FloatingAlert = () => {
  const { alertVisible, alertMessage, hideAlert } = useAlert();

  return (
    <>
      {alertVisible && (
        <div className="floating-alert">
          <Alert
            message={alertMessage}
            type="success"
            closable
            onClose={hideAlert}
          />
        </div>
      )}
    </>
  );
};

export default FloatingAlert;
