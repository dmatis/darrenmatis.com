import { MetaFunction } from '@remix-run/react'

export const meta: MetaFunction = () => {
	return [
		{ title: 'About Me | DMM' },
		{ name: 'description', content: 'A little bit about me' },
	]
}

export default function AboutRoute() {
	return (
		<div>
			<h1>About Me</h1>
		</div>
	)
}
