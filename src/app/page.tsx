import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description: "Landing page for the personal website of Darren Matis-Mei",
};

function Home() {
  return (
    <main>
      <h1>I&apos;m Darren</h1>
      <p>
        <Link href="/contact">Contact Me</Link>
      </p>
    </main>
  );
}

export default Home;
