import { NavLink } from '@remix-run/react'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const NavLinks = () => {
	return (
		<>
			<NavLink to="/about">About</NavLink>
			<NavLink to="/blog">Blog</NavLink>
			<NavLink to="/contact">Contact</NavLink>
		</>
	)
}

const Nav = () => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleNavbar = () => {
		setIsOpen(!isOpen)
	}

	return (
		<>
			<nav className="w-1/3 flex justify-end">
				<div className="hidden w-full md:flex justify-between">
					<NavLinks />
				</div>
				<div className="md:hidden">
					<button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
				</div>
			</nav>
			{isOpen && (
				<div className="md:hidden flex flex-col items-center basis-full">
					<NavLinks />
				</div>
			)}
		</>
	)
}

export default Nav
