import { json, type LinksFunction } from '@remix-run/node'
import { cssBundleHref } from '@remix-run/css-bundle'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from '@remix-run/react'
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'

import fontStylestylesheetUrl from './styles/font.css'
import tailwindStylesheetUrl from './styles/tailwind.css'
import { honeypot } from './utils/honeypot.server.ts'
import { HoneypotProvider } from 'remix-utils/honeypot/react'
import { getEnv } from './utils/env.server.ts'
import { GeneralErrorBoundary } from './components/ErrorBoundary.tsx'

export const links: LinksFunction = () => {
	return [
		{ rel: 'stylesheet', href: fontStylestylesheetUrl },
		{ rel: 'stylesheet', href: tailwindStylesheetUrl },
		cssBundleHref ? { rel: 'stylesheet', href: cssBundleHref } : undefined,
	].filter(Boolean)
}

export async function loader() {
	const honeyProps = honeypot.getInputProps()
	return json({
		ENV: getEnv(),
		honeyProps,
	})
}

function Document({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<div className="flex min-h-screen flex-col">
					{children}
					<ScrollRestoration />
					<Scripts />
					<LiveReload />
				</div>
			</body>
		</html>
	)
}

function App() {
	return (
		<Document>
			<Header />
			<main className="relative mx-auto my-0 box-border flex w-full max-w-7xl flex-[1] flex-grow flex-col py-[1em] px-[2em]">
				<Outlet />
			</main>
			<Footer />
		</Document>
	)
}

export default function AppWithProviders() {
	const data = useLoaderData<typeof loader>()
	return (
		<HoneypotProvider {...data.honeyProps}>
			<App />
		</HoneypotProvider>
	)
}

export function ErrorBoundary() {
	return (
		<Document>
			<div className="flex-1">
				<GeneralErrorBoundary />
			</div>
		</Document>
	)
}
