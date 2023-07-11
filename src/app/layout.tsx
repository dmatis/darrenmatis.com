import React from "react";
import ToastProvider from "../components/ToastProvider";
import ToastShelf from "../components/ToastShelf";
import "./styles.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Default Title",
};

function HomeLayout({ children }: { children: React.ReactNode }) {
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
