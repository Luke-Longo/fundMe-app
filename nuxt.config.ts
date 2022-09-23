export default defineNuxtConfig({
	modules: ["@nuxtjs/tailwindcss"],
	css: ["@/assets/css/main.css"],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
});
