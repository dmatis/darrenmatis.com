'use client';
import React from 'react';

import { ToastType } from '../Toast';
import useKeydown from '../../hooks/use-keydown';

type ToastContextType = {
  toasts: ToastType[];
  createToast: (message: string, variant: ToastType['variant']) => void;
  dismissToast: (id: string) => void;
};

export const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined
);

export function useToastContext() {
  let context = React.useContext(ToastContext);
  // If context is undefined, we know we used Toast
  // outside of our provider so we can throw a more helpful
  // error!
  if (context === undefined) {
    throw Error(
      'Toast must be used inside of a ToastProvider, ' +
        'otherwise it will not function correctly.'
    );
  }

  return context;
}

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastType[]>([]);

  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, []);

  useKeydown('Escape', handleEscape);

  function createToast(message: string, variant: ToastType['variant']) {
    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ];

    setToasts(nextToasts);
  }

  function dismissToast(id: string) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });
    setToasts(nextToasts);
  }

  return (
    <ToastContext.Provider
      value={{
        toasts,
        createToast,
        dismissToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
