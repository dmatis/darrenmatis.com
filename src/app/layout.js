import React from 'react';
import ToastProvider from '../components/ToastProvider';
import ToastShelf from '../components/ToastShelf';
import './styles.css';

function HomeLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          {children}
          <ToastShelf />
        </ToastProvider>
      </body>
    </html>
  );
}

export default HomeLayout;
