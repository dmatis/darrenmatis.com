/** @type {import('@remix-run/dev').AppConfig} */
export default {
	cacheDirectory: './node_modules/.cache/remix',
	ignoredRouteFiles: ['**/.*'],
	serverModuleFormat: 'esm',
	tailwind: true,
	postcss: true,
	watchPaths: ['./tailwind.config.ts'],
}
