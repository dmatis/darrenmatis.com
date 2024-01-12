import { MetaFunction } from '@remix-run/react'

export const meta: MetaFunction = () => {
	return [
		{ title: 'Blog | DMM' },
		{ name: 'description', content: 'A collection of my writing' },
	]
}

export default function BlogRoute() {
	return (
		<div>
			<h1>Blog</h1>
		</div>
	)
}
