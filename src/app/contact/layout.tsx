import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact form to send an email",
};

function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default ContactLayout;
