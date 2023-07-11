'use client';
import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from 'react-feather';

import { useToastContext } from '../ToastProvider';
import VisuallyHidden from '../VisuallyHidden';

import styles from './Toast.module.css';

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

export type ToastType = {
  id: string;
  message: string;
  variant: keyof typeof ICONS_BY_VARIANT;
};

function Toast({
  id,
  variant,
  children,
}: {
  id: string;
  variant: keyof typeof ICONS_BY_VARIANT;
  children: React.ReactNode;
}) {
  const { dismissToast } = useToastContext();
  const Icon = ICONS_BY_VARIANT[variant] || Info;

  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        <Icon size={24} />
      </div>
      <p className={styles.content}>
        <VisuallyHidden>{variant} -</VisuallyHidden>
        {children}
      </p>
      <button
        className={styles.closeButton}
        onClick={() => dismissToast(id)}
        aria-label="Dismiss message"
        aria-live="off"
      >
        <X size={24} />
      </button>
    </div>
  );
}

export default Toast;
