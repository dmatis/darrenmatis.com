import * as React from 'react'
import { cn } from '../utils/misc.ts'
import { Button, type ButtonProps } from './Button.tsx'

export const StatusButton = React.forwardRef<
	HTMLButtonElement,
	ButtonProps & { status: 'pending' | 'success' | 'error' | 'idle' }
>(({ status = 'idle', className, children, ...props }, ref) => {
	const companion = {
		pending: <span className="inline-block animate-spin">🌀</span>,
		success: <span>✅</span>,
		error: <span>❌</span>,
		idle: null,
	}[status]
	return (
		<Button
			ref={ref}
			className={cn('flex justify-center gap-4 select-none', className)}
			{...props}
		>
			<div>{children}</div>
			{companion}
		</Button>
	)
})
StatusButton.displayName = 'Button'
