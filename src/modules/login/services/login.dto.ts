type LoginInputDto = {
	usuario: string;
	senha: string;
};

type LoginOutputDto = {
	usuario: { id: number; login: string; perfil: string; };
	token: string;
};

type Perfil = {
	[key in string]: string[];
};

export type { LoginInputDto, LoginOutputDto, Perfil };
