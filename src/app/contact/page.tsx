'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Metadata } from 'next';
import { useToastContext } from '../../components/ToastProvider';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact form to send an email',
};

function ContactPage() {
  const router = useRouter();
  const { createToast } = useToastContext();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      name: { value: string };
      email: { value: string };
      message: { value: string };
    };

    createToast(
      `
    Thanks ${target.name.value}, your message was received!`,
      'success'
    );

    router.push('/');
  }

  return (
    <main>
      <h1>Contact Me</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input id="name" required={true} />

        <label htmlFor="email">Email:</label>
        <input id="email" required={true} />

        <label htmlFor="message">Message:</label>
        <textarea id="message" />

        <button>Submit</button>
      </form>
    </main>
  );
}

export default ContactPage;
