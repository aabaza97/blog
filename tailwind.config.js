/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [],
	variants: {
		space: ['responsive', 'direction'],
		margin: ['responsive', 'direction'],
		padding: ['responsive', 'direction'],
	},
};
