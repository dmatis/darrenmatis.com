/**
 * This is intended to be a basic starting point for linting in your app.
 * It relies on recommended configs out of the box for simplicity, but you can
 * and should modify this configuration to best suit your team's needs.
 */
const vitestFiles = ['app/**/__tests__/**/*', 'app/**/*.{spec,test}.*']
const testFiles = ['**/tests/**', ...vitestFiles]
const appFiles = ['app/**']

/** @type {import('eslint').Linter.Config} */
module.exports = {
	root: true,
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	env: {
		browser: true,
		commonjs: true,
		es6: true,
	},

	// Base config
	extends: [
		'@remix-run/eslint-config',
		'@remix-run/eslint-config/node',
		'prettier',
	],

	overrides: [
		{
			files: appFiles,
			excludedFiles: testFiles,
			rules: {
				'no-restricted-imports': [
					'error',
					{
						patterns: [
							{
								group: testFiles,
								message: 'Do not import test files in app files',
							},
						],
					},
				],
			},
		},
	],
}
