/** @type {import('@remix-run/dev').AppConfig} */
export default {
	ignoredRouteFiles: ['**/.*'],
	serverDependenciesToBundle: ['@radix-ui/themes'],
	tailwind: true,
	postcss: true,
	watchPaths: ['./tailwind.config.ts'],
}
