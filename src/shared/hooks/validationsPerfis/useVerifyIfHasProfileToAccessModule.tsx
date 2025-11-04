import { LoginOutputDto } from "@modules/login/services/login.dto";
import { redirect } from "react-router-dom";

/**
 * Custom hook for validate if user has permission to access module based in your perfil.
 * @returns {object} Returns an object containing the a function called execute.
 * This function execute receive perfisByModule (string[]). This parameter indicates which profiles access the module.
 * The function execute return a boolean. If true, user has profile to access model.
 */
function useVerifyIfHasProfileToAccessModule() {
	function execute(perfisByModule: string[]) {
		const accessTokenStoraged = localStorage.getItem("@perfil");
		if (!accessTokenStoraged) throw redirect("/login");

		const userData = localStorage.getItem("@user_data");
		const parsedUserData: LoginOutputDto = userData
			? JSON.parse(userData)
			: null;
		const perfil = parsedUserData.usuario.permissoes;

		if (
			perfisByModule.some((perfilByModule) =>
				perfil.some((profile) => profile === perfilByModule)
			)
		)
			return true;

		return false;
	}

	return {
		execute,
	};
}

export { useVerifyIfHasProfileToAccessModule };
