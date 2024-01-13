import type { LinksFunction } from '@remix-run/node'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import { Theme } from '@radix-ui/themes'

import styles from '~/tailwind.css'
import radixStyles from '@radix-ui/themes/styles.css'

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: styles },
	{ rel: 'stylesheet', href: radixStyles },
]

export default function App() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<Theme>
					<div className="flex min-h-screen flex-col">
						<Header />
						<main className="relative mx-auto my-0 box-border flex w-full max-w-7xl flex-[1] flex-grow flex-col py-[1em] px-[2em]">
							<Outlet />
						</main>
						<Footer />
					</div>
				</Theme>
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}
