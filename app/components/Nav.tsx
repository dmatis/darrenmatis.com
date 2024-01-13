import { NavLink } from '@remix-run/react'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navLinkStyles = 'text-blue-500 hover:text-blue-800 select-none'
const activeClassName = `font-semibold ${navLinkStyles}`
const activeStyleCallback = ({ isActive }: { isActive: boolean }) =>
	isActive ? activeClassName : navLinkStyles

const NavLinks = () => {
	return (
		<>
			<NavLink className={activeStyleCallback} to="/about">
				About
			</NavLink>
			<NavLink className={activeStyleCallback} to="/blog">
				Blog
			</NavLink>
			<NavLink className={activeStyleCallback} to="/contact">
				Contact
			</NavLink>
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
