import React, { createContext, useEffect, useState } from "react";
import { UserContextType } from "./userContextType";
// import { UserData } from "@modules/gestaoProfissionais/interfaces/userData";

const UserContext = createContext<UserContextType>({} as UserContextType);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<string>(() => {
		const userLocalStorage = localStorage.getItem("@user");
		if (!userLocalStorage) return "";
		return userLocalStorage;
	});

	const [perfil, setPerfil] = useState<string[]>(() => {
		const perfilLocalStorage = localStorage.getItem("@perfil");
		if (!perfilLocalStorage) return "";
		return JSON.parse(perfilLocalStorage);
	});

	// const [userData, setUserData] = useState<UserData>(() => {
	// 	const userDataLocalStorage = localStorage.getItem("@user_data");
	// 	if (!userDataLocalStorage) return "";
	// 	return JSON.parse(userDataLocalStorage);
	// });

	useEffect(() => {
		if (user) {
			localStorage.setItem("@user", user);
		}
	}, [user]);

	useEffect(() => {
		if (perfil) {
			localStorage.setItem("@perfil", JSON.stringify(perfil));
		}
	}, [perfil]);

	const values: UserContextType = {
		user: {
			value: user,
			set: setUser,
		},
		perfil: {
			value: perfil,
			set: setPerfil,
		},
		// userData: {
		// 	value: userData,
		// 	set: setUserData,
		// },
	};
	return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export { UserContextProvider, UserContext };
