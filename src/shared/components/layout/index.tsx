import Logo from "@assets/imgs/logo.png";
import { DialogLogout } from "@components/dialogLogout";
import { cn } from "@components/lib/utils";
import { Button } from "@components/ui/button";
import { ScrollArea } from "@components/ui/scroll-area";
import { SidebarButton } from "@customTypes/sidebarButton";
import { useState, useEffect, useRef } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { PiCaretRightBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { SidebarDrawer } from "./sidebarDrawer";
import { Breadcrumb } from "@components/types/Breadcrumb";
import { Tooltip } from "@components/tooltip";
import { Separator } from "@components/ui/separator";
import { LuLayoutDashboard } from "react-icons/lu";
import notification from "@assets/audios/simple-notification-152054.mp3";
import { FaCheck } from "react-icons/fa6";
import { socket, joinSetor } from "@api/websocket";
import { useUserContext } from "@shared/context/user/useUserContext";
import { useGetChamados } from "@shared/services/getChamados/getChamados.service";
import { SetorDialog } from "@components/dialogSetor";
import { chamadoData } from "@shared/services/getChamados/getChamados.dto";
import { useVerifyIfHasProfileToAccessModule } from "@shared/hooks/validationsPerfis/useVerifyIfHasProfileToAccessModule";
import { permissionsByModule } from "@shared/configs/permissionByModule";

type Props = {
	children: React.ReactNode;
	sidebarButton: SidebarButton[];
	breadcrumbs?: Breadcrumb[];
	defaultDisabled?: boolean;
};

const Layout = ({
	children,
	sidebarButton,
	breadcrumbs = [],
	defaultDisabled,
}: Props) => {
	const navigate = useNavigate();
	const [isOpenDialog, setIsOpenDialog] = useState(false);
	const [isOpenSetorDialog, setIsOpenSetorDialog] = useState(false);

	// 🆕 agora é ARRAY
	const [notifications, setNotifications] = useState<chamadoData[]>([]);

	const audioRef = useRef<HTMLAudioElement | null>(null);

	const { user } = useUserContext();
	const { execute } = useVerifyIfHasProfileToAccessModule();

	// carrega áudio 1x
	useEffect(() => {
		const audio = new Audio(notification);
		audio.volume = 0.5;
		audioRef.current = audio;

		return () => {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current = null;
			}
		};
	}, []);

	useEffect(() => {
		if (!socket.connected) {
			console.log("🔁 [socket] não estava conectado, conectando...");
			socket.connect();
		}

		const setorLocal = localStorage.getItem("@setorSelected");
		if (!setorLocal) return;
		const setorid = JSON.parse(setorLocal)
		console.log(setorid.Id, "aquweqiuw")
		joinSetor(setorid.Id);

		const handleEntrou = (data: any) => {
			console.log("✅ [socket] entrou_no_setor:", data);
		};

		const handleErro = (data: any) => {
			console.log("❌ [socket] erro_setor:", data);
		};

		const handleSetoresRegistrados = (data: any) => {
			console.log("📥 [socket] setores_registrados:", data);
		};

		const handleAny = (event: string, ...args: any[]) => {
			console.log("👀 [socket:onAny]", event, args);
		};

		socket.on("entrou_no_setor", handleEntrou);
		socket.on("erro_setor", handleErro);
		socket.on("setores_registrados", handleSetoresRegistrados);
		socket.onAny(handleAny);

		return () => {
			socket.off("entrou_no_setor", handleEntrou);
			socket.off("erro_setor", handleErro);
			socket.off("setores_registrados", handleSetoresRegistrados);
			socket.offAny(handleAny);
		};
	}, []);

	useEffect(() => {
		const handleReceberChamado = (data: any) => {
			console.log("🚨 [socket] chamado recebido:", data);

			const newNotif: chamadoData = {
				chamadoId: data.chamadoId,
				setorId: data.IdSetor,
				pacienteLeitoId: data.IdPacienteLeito,
				prioridade: data.prioridade,
				mensagem: data.mensagem,
				hora: data.hora,
				nomePaciente: data.NomePaciente,
				nomeLeito: data.NomeLeito,
				tipo: data.tipo
			};

			setNotifications((prev) => [newNotif, ...prev]);

			if (audioRef.current) {
				audioRef.current.currentTime = 0;
				audioRef.current.play().catch(() => { });
			}
		};

		const handleChamadoAceito = (data: any) => {
			console.log("📩 [socket] chamado_aceito:", data);
			const { chamadoId } = data;
			setNotifications((prev) =>
				prev.filter((n) => n.chamadoId !== chamadoId)
			);
		};

		const handleChamadoCancelado = (data: any) => {
			console.log("📩 [socket] chamado_cancelado:", data);
			const { chamadoId } = data;
			setNotifications((prev) =>
				prev.filter((n) => n.chamadoId !== chamadoId)
			);
		};

		const handleChamadoEncerrado = (data: any) => {
			console.log("📩 [socket] chamado_cancelado:", data);
			const { chamadoId } = data;
			setNotifications((prev) =>
				prev.filter((n) => n.chamadoId !== chamadoId)
			);
		};

		socket.on("receber_chamado", handleReceberChamado);
		socket.on("chamado_aceito", handleChamadoAceito);
		socket.on("chamado_cancelado", handleChamadoCancelado);
		socket.on("chamado_encerrado_auto", handleChamadoEncerrado);
		socket.on("chamado_aceito_ok", (data: any) => {
			console.log("✅ [socket] chamado_aceito_ok:", data);
			// quem aceitou também remove (garantia)
			if (data?.chamadoId) {
				setNotifications((prev) =>
					prev.filter((n) => n.chamadoId !== data.chamadoId)
				);
			}
		});

		return () => {
			socket.off("receber_chamado", handleReceberChamado);
			socket.off("chamado_aceito", handleChamadoAceito);
			socket.off("chamado_aceito_ok");
		};
	}, []);

	// aceitar UM chamado específico
	const handleAcceptNotification = (notif: chamadoData) => {
		console.log("Usuario", user.value);
		if (!notif.chamadoId) return;
		if (!user?.value?.id) {
			console.warn("❗ sem id de profissional no contexto");
			return;
		}

		console.log("📤 [socket] aceitar_chamado:", {
			chamadoId: notif.chamadoId,
			idProfissional: user.value.id,
			setorId: notif.setorId,
		});

		socket.emit("aceitar_chamado", {
			chamadoId: notif.chamadoId,
			idProfissional: user.value.id,
			setorId: notif.setorId,
		});

		setNotifications((prev) =>
			prev.filter((n) => n.chamadoId !== notif.chamadoId)
		);
	};

	async function getChamados() {
		try {
			if (execute(permissionsByModule.ADMIN)) return;
			const setorLocal = localStorage.getItem("@setorSelected");
			if (!setorLocal) return;
			const setorid = JSON.parse(setorLocal);
			const params = {
				id_setor: setorid.Id
			}
			const response = await useGetChamados.execute(params)
			setNotifications(prev => {
				const merged = [...response.data, ...prev];
				const seen = new Set<number>();
				return merged.filter(c => !seen.has(c.chamadoId) && seen.add(c.chamadoId));
			});
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		const setorLocalStorage = localStorage.getItem("@setorSelected");
		if (!setorLocalStorage) {
			setIsOpenSetorDialog(true);
		}
		if (setorLocalStorage) {
			getChamados();
		}
	}, [])

	return (
		<div className="w-full h-screen flex relative">
			<aside className="w-[5%] flex flex-col items-center gap-6 relative bg-primary transition-all">
				<div className="w-full h-[10%] flex items-center justify-center">
					<img src={Logo} alt="Logo" className="w-24 mt-6 mb-5" />
				</div>
				<Tooltip side="right" text="Dashboard">
					<button
						onClick={() => navigate("/dashboard")}
						className={cn(
							"w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-zinc-700 text-2xl hover:bg-[#063552] hover:text-zinc-900 focus:bg-[#063552] focus:text-white transition-all",
							window.location.pathname === "/dashboard" &&
							"bg-secondary text-white"
						)}
					>
						<p className="text-slate-100">
							<LuLayoutDashboard />
						</p>
					</button>
				</Tooltip>
				<Separator className="w-2/3 bg-secondary" />
				{sidebarButton.map((item, index) => (
					<Tooltip side="right" text={item.label} key={index}>
						<button
							onClick={() => navigate(item.path)}
							disabled={item.disabled}
							className={cn(
								"w-10 h-10 flex items-center justify-center rounded-full text-white text-2xl hover:bg-[#134b6e] focus:bg-[#134b6e] transition-all",
								window.location.pathname === item.path && "bg-[#134b6e]",
								!defaultDisabled && item.disabled && "hidden",
								defaultDisabled && item.disabled
									? "hover:bg-primary text-[#134b6e] hover:text-[#134b6e]"
									: "hover:bg-none"
							)}
						>
							<p>{item.icon}</p>
						</button>
					</Tooltip>
				))}
				<Tooltip side="right" text="Logout">
					<button
						onClick={() => setIsOpenDialog(true)}
						className={cn(
							"w-10 h-10 flex items-center justify-center rounded-full text-2xl hover:bg-[#063552] focus:text-white transition-all"
						)}
					>
						<p className="text-white">
							<MdOutlineLogout />
						</p>
					</button>
				</Tooltip>
				<SidebarDrawer buttons={sidebarButton}>
					<button className="absolute z-50 bottom-14 -right-1 -mr-4 bg-white w-10 h-10 rounded-full shadow-md shadow-gray-500 flex items-center justify-center group hover:bg-slate-200 transition-all">
						<PiCaretRightBold className="text-2xl text-black" />
					</button>
				</SidebarDrawer>
			</aside>

			<div className="w-[95%] bg-primary">
				<header className="w-full h-[10%] flex items-center justify-between p-4">
					<div className="flex items-center gap-3">
						<Button
							variant="link"
							className="p-0 disabled:opacity-100"
							disabled={breadcrumbs.length === 0}
							onClick={() => navigate("/dashboard")}
						>
							<h1 className="text-2xl font-semibold text-white">Dashboard</h1>
						</Button>
						{breadcrumbs.map((item, index) => (
							<div key={index} className="flex items-center">
								<span className="text-white font-bold mr-3">{">"}</span>
								<Button
									variant="link"
									disabled={index === breadcrumbs.length - 1}
									className="p-0 disabled:opacity-100"
									onClick={() => navigate(item.path)}
								>
									<h2 className="text-2xl font-semibold text-white">
										{item.label}
									</h2>
								</Button>
							</div>
						))}
					</div>
				</header>
				<div className="flex max-w-[99%] min-h-[88%] max-h-[88%] bg-white rounded-3xl shadow-2xl p-4">
					<ScrollArea className="w-full p-4">{children}</ScrollArea>
				</div>
			</div>
			{isOpenDialog && (
				<DialogLogout
					isOpen={isOpenDialog}
					onClose={() => setIsOpenDialog(false)}
				/>
			)}
			{notifications.length > 0 && (
				<div className="fixed bottom-7 right-7 z-50 flex flex-col gap-4">
					{notifications.map((notif) => (
						<div
							key={notif.chamadoId}
							className="bg-white rounded-3xl shadow-2xl border-[1px] border-primary flex flex-col items-center"
							role="alert"
						>
							<div className="flex flex-row justify-start items-center gap-4 py-2 px-4">
								<img src={Logo} alt="Logo" className="w-20 mt-2 mb-2" />
								<div className="">
									<p className="font-semibold text-primary">
										Paciente:{" "}
										{notif.nomePaciente ||
											`${notif.nomePaciente ?? "?"}`}
									</p>
									<p>
										Tipo: {notif.tipo}
									</p>
									<p>
										Leito: {notif.nomeLeito || notif.pacienteLeitoId || "—"}
									</p>
									{notif.mensagem && <p>{notif.mensagem}</p>}
									{notif.prioridade && (
										<p className={`${notif.prioridade === "ALTA"
											? "text-red-500"
											: notif.prioridade === "MEDIA"
												? "text-yellow-500"
												: notif.prioridade === "BAIXA"
													? "text-green-500"
													: "text-cyan-900"
											}`}>
											Prioridade: {notif.prioridade}
										</p>
									)}
									<p className="text-xs text-gray-400">
										{notif.hora
											? new Date(notif.hora).toLocaleString()
											: "agora"}
									</p>
								</div>
								<button
									onClick={() => handleAcceptNotification(notif)}
									className="bg-primary w-10 h-10 px-3 py-1 rounded transition text-white font-semibold flex items-center justify-center"
								>
									<FaCheck />
								</button>
							</div>
						</div>
					))}
				</div>
			)}
			{isOpenSetorDialog && <SetorDialog
				isOpen={isOpenSetorDialog}
				onOpenChange={setIsOpenSetorDialog}
				onSucess={() => {
					getChamados();
					const setorLocal = localStorage.getItem("@setorSelected");
					if (!setorLocal) return;
					const setorid = JSON.parse(setorLocal);
					joinSetor(setorid.Id);
				}}
			/>}
		</div>
	);
};

export { Layout };
