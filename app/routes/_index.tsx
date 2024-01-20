import type { MetaFunction } from '@remix-run/node'
import profilePhoto from '../images/profile-photo.png'
import { NavLink } from '@remix-run/react'

export const meta: MetaFunction = () => {
	return [
		{ title: 'Home | DMM' },
		{ name: 'description', content: 'Welcome to darrenmatis.com' },
	]
}

export default function Index() {
	return (
		<div className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
			<img
				className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
				src={profilePhoto}
				alt="My face"
			/>
			<div className="text-center space-y-2 sm:text-left">
				<div className="space-y-0.5">
					<p className="text-lg text-black font-semibold">{"I'm Darren"}</p>
					<p className="text-slate-500 font-medium">Fullstack Engineer</p>
				</div>
				<NavLink to="/contact">
					<button className="select-none px-4 py-1 text-sm text-blue-600 font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
						Contact
					</button>
				</NavLink>
			</div>
		</div>
	)
}
