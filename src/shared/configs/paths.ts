const pathBuilder = (mode: string) => {
	const production = "https://api-meu-leito.onrender.com/api";
	const development = "https://api-meu-leito.onrender.com/api";
	// const development = "http://localhost:3500/api";

	return mode === "production" ? production : development;
};

const baseURL = pathBuilder(import.meta.env.MODE);

export { baseURL };
