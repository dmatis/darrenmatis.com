import React from 'react';
import Link from 'next/link';

function Home() {
  return (
    <>
      <h1 className="title">I'm Darren</h1>
      <ol>
        <li>
          <Link href="/about">About Me</Link>
        </li>
        <li>
          <Link href="/contact">Contact Me</Link>
        </li>
      </ol>
    </>
  );
}

export default Home;
