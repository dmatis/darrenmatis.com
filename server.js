import * as fs from 'node:fs'
import * as path from 'node:path'
import * as url from 'node:url'

import { createRequestHandler } from '@remix-run/express'
import { broadcastDevReady, installGlobals } from '@remix-run/node'
import compression from 'compression'
import { ip as ipAddress } from 'address'
import express from 'express'
import morgan from 'morgan'
import chalk from 'chalk'
import sourceMapSupport from 'source-map-support'
import rateLimit from 'express-rate-limit'

sourceMapSupport.install({
	retrieveSourceMap: function (source) {
		const match = source.startsWith('file://')
		if (match) {
			const filePath = url.fileURLToPath(source)
			const sourceMapPath = `${filePath}.map`
			if (fs.existsSync(sourceMapPath)) {
				return {
					url: source,
					map: fs.readFileSync(sourceMapPath, 'utf8'),
				}
			}
		}
		return null
	},
})
installGlobals()

/** @typedef {import('@remix-run/node').ServerBuild} ServerBuild */

const BUILD_PATH = path.resolve('build/index.js')
const VERSION_PATH = path.resolve('build/version.txt')

const initialBuild = await reimportServer()
const remixHandler =
	process.env.NODE_ENV === 'development'
		? await createDevRequestHandler(initialBuild)
		: createRequestHandler({
				build: initialBuild,
				mode: initialBuild.mode,
		  })

const app = express()

// no ending slashes for SEO reasons
// https://github.com/epicweb-dev/epic-stack/discussions/108
app.use((req, res, next) => {
	if (req.path.endsWith('/') && req.path.length > 1) {
		const query = req.url.slice(req.path.length)
		const safepath = req.path.slice(0, -1).replace(/\/+/g, '/')
		res.redirect(301, safepath + query)
	} else {
		next()
	}
})

app.use(compression())

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by')

// Remix fingerprints its assets so we can cache forever.
app.use(
	'/build',
	express.static('public/build', { immutable: true, maxAge: '1y' }),
)

// Aggressively cache fonts for a year
app.use(
	'/fonts',
	express.static('public/fonts', { immutable: true, maxAge: '1y' }),
)

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static('public', { maxAge: '1h' }))

app.use(morgan('tiny'))

// Rate limiting
const limitMultiple = process.env.TESTING ? 10_000 : 1
const rateLimitDefault = {
	windowMs: 60 * 1000,
	limit: 1000 * limitMultiple,
	standardHeaders: true,
	legacyHeaders: false,
}

const strongRateLimit = rateLimit({
	...rateLimitDefault,
	limit: 10 * limitMultiple,
})
const generalRateLimit = rateLimit(rateLimitDefault)

// - strongRateLimit is for POST requests on /contact
// - generalRateLimit is for everything else
app.use((req, res, next) => {
	const strongPaths = ['/contact']
	if (req.method !== 'GET' && req.method !== 'HEAD') {
		if (strongPaths.some(path => req.path.includes(path))) {
			return strongRateLimit(req, res, next)
		}
	}

	return generalRateLimit(req, res, next)
})

app.all('*', remixHandler)

const port = 3000
app.listen(port, async () => {
	console.log(`🚀  We have liftoff!`)
	const localUrl = `http://localhost:${port}`
	let lanUrl = null
	const localIp = ipAddress() ?? 'Unknown'
	// Check if the address is a private ip
	// https://en.wikipedia.org/wiki/Private_network#Private_IPv4_address_spaces
	// https://github.com/facebook/create-react-app/blob/d960b9e38c062584ff6cfb1a70e1512509a966e7/packages/react-dev-utils/WebpackDevServerUtils.js#LL48C9-L54C10
	if (/^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(localIp)) {
		lanUrl = `http://${localIp}:${port}`
	}
	console.log(
		`
${chalk.bold('Local:')}            ${chalk.cyan(localUrl)}
${lanUrl ? `${chalk.bold('On Your Network:')}  ${chalk.cyan(lanUrl)}` : ''}
${chalk.bold('Press Ctrl+C to stop')}
    `.trim(),
	)
	if (process.env.NODE_ENV === 'development') {
		broadcastDevReady(initialBuild)
	}
})

/**
 * @returns {Promise<ServerBuild>}
 */
async function reimportServer() {
	const stat = fs.statSync(BUILD_PATH)

	// convert build path to URL for Windows compatibility with dynamic `import`
	const BUILD_URL = url.pathToFileURL(BUILD_PATH).href

	// use a timestamp query parameter to bust the import cache
	return import(BUILD_URL + '?t=' + stat.mtimeMs)
}

/**
 * @param {ServerBuild} initialBuild
 * @returns {Promise<import('@remix-run/express').RequestHandler>}
 */
async function createDevRequestHandler(initialBuild) {
	let build = initialBuild
	async function handleServerUpdate() {
		// 1. re-import the server build
		build = await reimportServer()
		// 2. tell Remix that this app server is now up-to-date and ready
		broadcastDevReady(build)
	}
	const chokidar = await import('chokidar')
	chokidar
		.watch(VERSION_PATH, { ignoreInitial: true })
		.on('add', handleServerUpdate)
		.on('change', handleServerUpdate)

	// wrap request handler to make sure its recreated with the latest build for every request
	return async (req, res, next) => {
		try {
			return createRequestHandler({
				build,
				mode: 'development',
			})(req, res, next)
		} catch (error) {
			next(error)
		}
	}
}
