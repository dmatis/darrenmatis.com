import type { ActionFunctionArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import type { MetaFunction } from '@remix-run/react'
import { Form, useActionData } from '@remix-run/react'
import { HoneypotInputs } from 'remix-utils/honeypot/react'
import { conform, useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import { Label } from '../components/Label.tsx'
// import { Resend } from 'resend'
import { z } from 'zod'
import { useIsSubmitting } from '../utils/misc.ts'
import { Input } from '../components/Input.tsx'
import { StatusButton } from '../components/StatusButton.tsx'
import { TextArea } from '../components/TextArea.tsx'
import { checkHoneypot } from '#app/utils/honeypot.server.ts'
import { validateCSRF } from '#app/utils/csrf.server.ts'
import { AuthenticityTokenInput } from 'remix-utils/csrf/react'

export const meta: MetaFunction = () => {
	return [
		{ title: 'Contact | DMM' },
		{ name: 'description', content: 'Contact form' },
	]
}

const NAME_MAX_LENGTH = 100
const MESSAGE_MAX_LENGTH = 1000

const ContactFormSchema = z.object({
	name: z.string().max(NAME_MAX_LENGTH),
	email: z.string().email(),
	message: z.string().max(MESSAGE_MAX_LENGTH),
})

// const resend = new Resend('re_AzYczFcg_GcR6UrRjPoFpsMh222ncRNW7')

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()

	// Validate the CSRF token
	await validateCSRF(formData, request.headers)

	// Validate that honeypot field is not filled out
	checkHoneypot(formData)

	const submission = parse(formData, {
		schema: ContactFormSchema,
	})

	if (!submission.value) {
		return json({ status: 'error', submission }, { status: 400 })
	}

	const { name, email, message } = submission.value

	// const { data, error } = await resend.emails.send({
	// 	from: `${name} <${email}>`,
	// 	to: ['darren.matis@gmail.com'],
	// 	subject: '[darrenmatis.com] New Message',
	// 	html: message,
	// })

	// if (error) {
	// 	return json({ status: 'error', submission }, { status: 400 })
	// }

	// display toast message
	return redirect(`/`)
}

function ErrorList({
	id,
	errors,
}: {
	id?: string
	errors?: Array<string> | null
}) {
	return errors?.length ? (
		<ul id={id} className="flex flex-col gap-1">
			{errors.map((error, i) => (
				<li key={i} className="text-[10px] text-foreground-destructive">
					{error}
				</li>
			))}
		</ul>
	) : null
}

export default function Contact() {
	const actionData = useActionData<typeof action>()
	const isSubmitting = useIsSubmitting()

	const [form, fields] = useForm({
		id: 'contact-form',
		constraint: getFieldsetConstraint(ContactFormSchema),
		lastSubmission: actionData?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: ContactFormSchema })
		},
	})

	return (
		<div className="flex flex-col items-center justify-center py-8 px-8 max-w-md mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0">
			<h2 className="text-blue-700 text-xl mb-3">Send a Message</h2>
			<Form method="post" {...form.props}>
				<AuthenticityTokenInput />
				<div className="flex flex-col gap-3 select-none">
					<HoneypotInputs />
					<div>
						<Label htmlFor={fields.name.id}>Name</Label>
						<Input {...conform.input(fields.name)} />
						<div className="min-h-[32px] px-4 pb-3 pt-1">
							<ErrorList id={fields.name.errorId} errors={fields.name.errors} />
						</div>
					</div>
					<div>
						<Label htmlFor={fields.email.id}>Email</Label>
						<Input
							className="sm:min-w-80 min-w-64"
							{...conform.input(fields.email)}
						/>
						<div className="min-h-[32px] px-4 pb-3 pt-1">
							<ErrorList
								id={fields.email.errorId}
								errors={fields.email.errors}
							/>
						</div>
					</div>
					<div>
						<Label htmlFor={fields.message.id}>Message</Label>
						<TextArea {...conform.textarea(fields.message)} />
						<div className="min-h-[32px] px-4 pb-3 pt-1">
							<ErrorList
								id={fields.message.errorId}
								errors={fields.message.errors}
							/>
						</div>
					</div>
					<ErrorList id={form.errorId} errors={form.errors} />
					<div className="flex justify-end">
						<StatusButton
							form={form.id}
							status={isSubmitting ? 'pending' : 'idle'}
						>
							Send
						</StatusButton>
					</div>
				</div>
			</Form>
		</div>
	)
}
