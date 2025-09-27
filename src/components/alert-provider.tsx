'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { CustomAlert } from './alert';
import { AlertType } from '@/hooks/use-alert';

interface AlertContextType {
  showAlert: (options: { type?: AlertType; title: string; description?: string; duration?: number }) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType>({
  showAlert: () => {},
  hideAlert: () => {},
});

export function useAlertContext() {
  return useContext(AlertContext);
}

interface AlertProviderProps {
  children: React.ReactNode;
}

export function AlertProvider({ children }: AlertProviderProps) {
  const [alert, setAlert] = useState<{
    visible: boolean;
    type: AlertType;
    title: string;
    description?: string;
    duration: number;
  }>({
    visible: false,
    type: 'normal',
    title: '',
    duration: 2000
  });

  // 处理URL参数中的alert
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const alertParam = searchParams.get('alert');
      const alertType = searchParams.get('alerttype') as AlertType | null;
      const alertSec = searchParams.get('alertsec');

      if (alertParam) {
        setAlert({
          visible: true,
          type: alertType || 'normal',
          title: alertParam,
          description: alertSec || undefined,
          duration: 2000
        });
      }
    }
  }, []);

  const showAlert = (options: { type?: AlertType; title: string; description?: string; duration?: number }) => {
    setAlert({
      visible: true,
      type: options.type || 'normal',
      title: options.title,
      description: options.description,
      duration: options.duration || 2000
    });
  };

  const hideAlert = () => {
    setAlert(prev => ({ ...prev, visible: false }));
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <CustomAlert
        type={alert.type}
        title={alert.title}
        description={alert.description}
        visible={alert.visible}
        duration={alert.duration}
        onClose={hideAlert}
      />
    </AlertContext.Provider>
  );
}