'use client';
import React from 'react';

import { useToastContext } from '@/components/ToastProvider';
import Toast from '@/components/Toast';
import styles from './ToastShelf.module.css';

function ToastShelf() {
  const { toasts } = useToastContext();

  return (
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="assertive"
      aria-label="Notification"
    >
      {toasts.map((toast) => (
        <li key={toast.id} className={styles.toastWrapper}>
          <Toast id={toast.id} variant={toast.variant}>
            {toast.message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
