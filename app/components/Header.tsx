import Logo from './Logo.tsx'
import Nav from './Nav.tsx'

const Header = () => {
	return (
		<header className="bg-slate-200 sticky top-0 flex-wrap z-[20] mx-auto flex w-full items-center justify-between border-b p-8">
			<Logo />
			<Nav />
		</header>
	)
}

export default Header
