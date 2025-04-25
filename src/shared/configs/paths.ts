const pathBuilder = (mode: string) => {
	const production = "http://localhost:8080";
	const development = "http://localhost:8080";

	return mode === "production" ? production : development;
};

const baseURL = pathBuilder(import.meta.env.MODE);

export { baseURL };
