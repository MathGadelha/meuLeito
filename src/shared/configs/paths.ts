const pathBuilder = (mode: string) => {
	const production = "http://localhost:8080";
	const development = "http://localhost:3500/api";

	return mode === "production" ? production : development;
};

const baseURL = pathBuilder(import.meta.env.MODE);

export { baseURL };
