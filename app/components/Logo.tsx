import { motion } from 'framer-motion'
import { NavLink } from '@remix-run/react'
import logo from '~/images/logo-cropped.png'
// import { logoRotationVariant } from '~/data/animationConfig'

const Logo = () => {
	return (
		<div className="logo w-16 h-16">
			<NavLink to="/">
				<img src={logo} alt="logo" />
			</NavLink>
		</div>
	)
}

export default Logo
