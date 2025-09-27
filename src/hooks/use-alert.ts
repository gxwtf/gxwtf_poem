'use client';

import { useState, useCallback } from 'react';

export type AlertType = 'normal' | 'destructive';

export interface AlertOptions {
  type?: AlertType;
  title: string;
  description?: string;
  duration?: number;
}

export function useAlert() {
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

  const showAlert = useCallback((options: AlertOptions) => {
    setAlert({
      visible: true,
      type: options.type || 'normal',
      title: options.title,
      description: options.description,
      duration: options.duration || 2000
    });
  }, []);

  const hideAlert = useCallback(() => {
    setAlert(prev => ({ ...prev, visible: false }));
  }, []);

  return {
    alert,
    showAlert,
    hideAlert
  };
}