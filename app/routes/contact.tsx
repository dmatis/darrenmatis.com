import { MetaFunction } from '@remix-run/react'

export const meta: MetaFunction = () => {
	return [
		{ title: 'Contact | DMM' },
		{ name: 'description', content: 'Contact form' },
	]
}

export default function ContactRoute() {
	return (
		<div>
			<h1>Get In Touch</h1>
			<main>
				<form method="post">
					<div>
						<label>
							Name: <input type="text" name="name" />
						</label>
					</div>
					<div>
						<label>
							Email: <input type="text" name="name" />
						</label>
					</div>
					<div>
						<label>
							Message: <textarea name="content" />
						</label>
					</div>
					<div>
						<button type="submit" className="button">
							Submit
						</button>
					</div>
				</form>
			</main>
		</div>
	)
}
