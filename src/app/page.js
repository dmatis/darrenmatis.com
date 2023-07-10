import React from 'react';
import Link from 'next/link';

function Home() {
  return (
    <main>
      <h1>I'm Darren</h1>
      <p>
        <Link href="/contact">Contact Me</Link>
      </p>
    </main>
  );
}

export default Home;
