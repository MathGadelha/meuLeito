const pathBuilder = (mode: string) => {
	const production = "http://72.60.12.184:3500/api";
	const development = "http://localhost:3500/api";

	return mode === "production" ? production : development;
};

const baseURL = pathBuilder(import.meta.env.MODE);

export { baseURL };
