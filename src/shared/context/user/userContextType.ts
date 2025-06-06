type UserContextType = {
	user: {
		value: string;
		set: React.Dispatch<string>;
	};
	perfil: {
		value: string[];
		set: React.Dispatch<string[]>;
	};
	// userData: {
	// 	value: UserData;
	// 	set: React.Dispatch<UserData>;
	// };
};

export type { UserContextType };
