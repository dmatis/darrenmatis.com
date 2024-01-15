import { ActionFunctionArgs } from '@remix-run/node'
import { Form, MetaFunction } from '@remix-run/react'
import { conform, useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import { Button, TextField, TextArea } from '@radix-ui/themes'
import { Label } from '~/components/Label'
import { z } from 'zod'

export const meta: MetaFunction = () => {
	return [
		{ title: 'Contact | DMM' },
		{ name: 'description', content: 'Contact form' },
	]
}

export default function Contact() {
	return (
		<div className="flex flex-col items-center justify-center py-8 px-8 max-w-md mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0">
			<h2 className="text-blue-700 text-xl mb-3">Send a Message</h2>
			<Form method="post">
				<div className="flex flex-col gap-3 select-none">
					<div>
						<Label htmlFor="name-field">Name</Label>
						<TextField.Input placeholder="Name" id="name-field" />
					</div>
					<div>
						<Label htmlFor="subject-field">Subject</Label>
						<TextField.Input
							className="sm:min-w-80 min-w-64"
							placeholder="Subject"
							id="subject-field"
						/>
					</div>
					<div>
						<Label htmlFor="content-field">Message</Label>
						<TextArea placeholder="Message" id="content-field" />
					</div>
					<div className="flex justify-end">
						<Button>Send</Button>
					</div>
				</div>
			</Form>
		</div>
	)

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

const ContactFormSchema = z.object({
	name: z.string().min(3).max(100),
	email: z.string().email(),
	message: z.string().min(10).max(1000),
})

export async function action({ request, params }: ActionFunctionArgs) {
	// const formData = await request.formData()
}
