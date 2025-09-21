import { errorHandler } from "@api/errorHandler";
import { CustomFormProps } from "@customTypes/customFormProps";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
// import { useUserContext } from "../../../shared/context/user/useUserContext";
import { LoginFormSchema } from "../schema/loginFormSchema";
import { defaultValuesLogin } from "../schema/defaultValuesLogin";
// import { loginService } from "../services/login.service";

function useLoginForm() {
	const navigate = useNavigate();
	// const { user, userData, perfil } = useUserContext();
	const [loading, setLoading] = useState(false);

	const form = useForm<z.infer<typeof LoginFormSchema>>({
		resolver: zodResolver(LoginFormSchema),
		defaultValues: defaultValuesLogin,
	});

	const styleForm = "w-full flex flex-col items-center gap-4";

	const loginCustomForm: CustomFormProps = {
		form,
		loading,
		schema: LoginFormSchema,
		onsubmit: form.handleSubmit((data) => {
			loginSubmit(data);
			// console.log(data);
		}),
		inputs: [
			{
				name: "usuario",
				type: "text",
				label: "Usuário",
				id: "usuario",
				styleDiv: "w-full",
			},
			{
				name: "senha",
				type: "password",
				label: "Senha",
				id: "senha",
				styleDiv: "w-full",
			},
			{
				id: "remember",
				name: "remember",
				type: "switch",
				label: "Lembrar:",
				checked: form.watch("remember"),
				onCheckedChange: () => {
					form.setValue("remember", !form.watch("remember"));
				},
				styleDiv: "w-full flex justify-start",
			},
		],
		styleForm,
		styleButton: "w-full bg-[#032B43] text-white hover:bg-[#063552]",
		buttonLabel: "Continuar",
	};

	async function loginSubmit(data: z.infer<typeof LoginFormSchema>) {
		// data: z.infer<typeof LoginFormSchema>
		// const params = {
		// 	usuario: data.usuario,
		// 	senha: data.senha,
		// 	isWeb: true,
		// };
		toast.loading("Realizando login...");
		setLoading(true);
		try {
			// const response = await loginService.execute(params);
			// localStorage.setItem("@access_token", response.accessToken);
			// localStorage.setItem("@id", JSON.stringify(response.id));
			// localStorage.setItem("@perfil", JSON.stringify(response.perfil));
			// userData.set(response);
			// perfil.set(response.perfil);
			// user.set(response.usuario);

			// if (data.remember) {
			// 	localStorage.setItem("@refresh_token", response.refreshToken);
			// }
			toast.success("Login realizado com sucesso!");
			navigate("/dashboard");
		} catch (error) {
			errorHandler(error);
		} finally {
			setLoading(false);
		}
	}

	return {
		loginCustomForm,
		loginSubmit,
	};
}

export { useLoginForm };
