import { PhoneCall } from "lucide-react";
import { SlCallOut } from "react-icons/sl";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket, joinSetor } from "@api/websocket";
import { useGetPacienteLeitos } from "@modules/leitos/services/getPacienteLeito/getPacienteLeito.service";
import { pacienteLeitoData } from "@modules/leitos/services/getPacienteLeito/getPacienteLeito.dto";
import { useGetUltimoChamado } from "../services/getUltimoChamado/getUtimoChamado.service";
import { ultimoChamadoData } from "../services/getUltimoChamado/getUltimoChamado.dto";
import { finishChamado } from "../services/finalizarChamado/finalizarChamado.service";
import { errorHandler } from "@api/errorHandler";
import { Button } from "@components/ui/button";

type chamadoTipos = {
    tipo: string;
    prioridade: string;
};

const PacientesPage = () => {
    const pageParams = useParams();
    console.log("📄 Página do paciente ID:", pageParams.id);

    const [finishing, setFinishing] = useState(false);
    const [canceling, setCanceling] = useState(false);
    const [pacienteLeito, setPacienteLeito] = useState<pacienteLeitoData>(
        {} as pacienteLeitoData
    );
    const [disabled, setDisabled] = useState(true);

    const [lastCall, setLastCall] = useState<ultimoChamadoData>({});
    const [showCallForm, setShowCallForm] = useState(false);
    const [selectedChamado, setSelectedChamado] = useState<chamadoTipos>();
    const [observation, setObservation] = useState("");

    // 🔄 Loading enquanto getPacienteLeito roda
    const [loadingPaciente, setLoadingPaciente] = useState(true);

    const tiposChamados = [
        {
            tipo: "SOS",
            prioridade: "ALTA",
        },
        {
            tipo: "DORES",
            prioridade: "ALTA",
        },
        {
            tipo: "ATENDIMENTO",
            prioridade: "BAIXA",
        },
        {
            tipo: "ALIMENTACAO",
            prioridade: "MEDIA",
        },
        {
            tipo: "AGUA",
            prioridade: "BAIXA",
        },

        {
            tipo: "OUTROS",
            prioridade: "BAIXA",
        },
    ];

    async function getPacienteLeito() {
        try {
            if (!pageParams.id) {
                setLoadingPaciente(false);
                return;
            }

            setLoadingPaciente(true);
            const response = await useGetPacienteLeitos.execute(pageParams.id);
            setPacienteLeito(response.data[0]);
        } catch (error) {
            console.log("Erro no get de paciente");
        } finally {
            setLoadingPaciente(false);
        }
    }

    async function getUltimoChamado() {
        try {
            if (!pageParams.id) return;
            const params = {
                id_leito: pageParams.id,
            };
            const response = await useGetUltimoChamado.execute(params);
            setLastCall(response.data);
        } catch (error) {
            console.log("Erro no get de paciente");
        }
    }

    useEffect(() => {
        getPacienteLeito();
        getUltimoChamado();
    }, [pageParams.id]);

    useEffect(() => {
        if (!pageParams.id) {
            console.log(
                "⚠️ [socket] Nenhum id na rota, não vou entrar em room (paciente)"
            );
            return;
        }

        if (!socket.connected) {
            console.log("🔁 [socket] não estava conectado, conectando... (paciente)");
            socket.connect();
        }

        if (pacienteLeito.IdSetor) {
            console.log(
                "📤 [socket] entrando no setor (paciente):",
                pacienteLeito.IdSetor
            );
            joinSetor(pacienteLeito.IdSetor);
        }

        const handleEntrou = (data: any) => {
            console.log("✅ [socket] entrou_no_setor (paciente):", data);
            setDisabled(false);
        };

        const handleErro = (data: any) => {
            console.log("❌ [socket] erro_setor (paciente):", data);
            setDisabled(true);
        };

        const handleSetoresRegistrados = (data: any) => {
            console.log("📥 [socket] setores_registrados (paciente):", data);
        };

        socket.on("entrou_no_setor", handleEntrou);
        socket.on("erro_setor", handleErro);
        socket.on("setores_registrados", handleSetoresRegistrados);

        return () => {
            socket.off("entrou_no_setor", handleEntrou);
            socket.off("erro_setor", handleErro);
            socket.off("setores_registrados", handleSetoresRegistrados);
        };
    }, [pacienteLeito, pageParams.id]);

    useEffect(() => {
        const handleChamadoEnviado = (data: any) => {
            console.log("✅ [socket] chamado_enviado (paciente):", data);
            setLastCall((prev) => ({
                ...prev,
                chamadoId: data.chamadoId,
                status: "PENDENTE",
            }));
            setShowCallForm(false);
            setObservation("");
        };

        const handleChamadoAceito = (data: any) => {
            console.log("📩 [socket] chamado_aceito (paciente):", data);
            if (data.chamadoId === lastCall.chamadoId) {
                setLastCall((prev) => ({
                    ...prev,
                    status: "EM ATENDIMENTO",
                }));
            }
        };

        const handleChamadoFinalizado = (data: any) => {
            console.log("🏁 [socket] chamado_finalizado (paciente):", data);
            if (!lastCall.chamadoId || data.chamadoId !== lastCall.chamadoId) return;
            setLastCall({});
            setFinishing(false);
        };

        const handleErroFinalizar = (data: any) => {
            console.log("❌ [socket] erro_finalizar_chamado (paciente):", data);
            setFinishing(false);
        };

        socket.on("chamado_enviado", handleChamadoEnviado);
        socket.on("chamado_aceito", handleChamadoAceito);
        socket.on("chamado_finalizado", handleChamadoFinalizado);
        socket.on("erro_finalizar_chamado", handleErroFinalizar);

        return () => {
            socket.off("chamado_enviado", handleChamadoEnviado);
            socket.off("chamado_aceito", handleChamadoAceito);
            socket.off("chamado_finalizado", handleChamadoFinalizado);
            socket.off("erro_finalizar_chamado", handleErroFinalizar);
        };
    }, [lastCall.chamadoId]);

    const handleOpenCall = () => {
        setShowCallForm(true);
    };

    const handleSendCall = () => {
        if (!pacienteLeito.IdPaciente || !pacienteLeito.IdSetor) return;
        if (!selectedChamado) return; // garante que selecionou um tipo

        const payload = {
            id_paciente_leito: pacienteLeito.Id,
            setorId: pacienteLeito.IdSetor,
            prioridade: selectedChamado.prioridade,
            tipo: selectedChamado.tipo,
            mensagem: observation || null,
            nomePaciente: pacienteLeito.NomePaciente,
            nomeLeito: pacienteLeito.NomeLeito,
        };

        console.log("📞 emitindo novo_chamado:", payload);

        setLastCall({
            chamadoId: undefined,
            mensagem: payload.mensagem ?? undefined,
            tipo: payload.tipo,
            hora: new Date().toISOString(),
            status: "PENDENTE",
        });

        socket.emit("novo_chamado", payload);
    };

    async function handleCancelCall() {
        if (canceling) return;
        setCanceling(true);
        if (!lastCall.chamadoId || !pacienteLeito.IdSetor) return;

        try {
            const payload = {
                chamadoId: lastCall.chamadoId,
                setorId: pacienteLeito.IdSetor,
            };

            console.log("📞 emitindo cancelar chamado:", payload);

            socket.emit("cancelar_chamado", payload);

            setLastCall({
                chamadoId: lastCall.chamadoId,
                mensagem: lastCall.mensagem ?? undefined,
                prioridade: lastCall.prioridade,
                hora: lastCall.hora,
                status: "CANCELADO",
            });
        } catch (erro) {
            errorHandler(erro);
        } finally {
            setCanceling(false);
        }
    }

    async function handleFinishCall() {
        if (finishing) return;
        if (!lastCall.chamadoId || !pacienteLeito.IdSetor) return;

        try {
            await finishChamado.execute(lastCall.chamadoId.toString());
            setFinishing(true);
            getUltimoChamado();
        } catch (erro) {
            errorHandler(erro);
        }
    }

    // ⏳ Tela de loading enquanto busca o leito
    if (loadingPaciente) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-gray-600 text-sm">
                    Carregando informações do leito...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {pacienteLeito && pacienteLeito.IdPaciente ? (
                <>
                    <header className="bg-white shadow-md p-4 flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold text-gray-800">
                                Olá, {pacienteLeito.NomePaciente}!
                            </h1>
                            <p className="text-sm text-gray-500">
                                Paciente do {pacienteLeito.NomeLeito} - {pacienteLeito.NomeSetor}
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
                            M
                        </div>
                    </header>
                    <main className="flex-1 p-6 space-y-6">
                        <section className="bg-white rounded-lg shadow p-4">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">
                                Último chamado
                            </h2>
                            {lastCall.status ? (
                                <>
                                    <p className="text-gray-600">
                                        Observação: {lastCall.mensagem || "—"}
                                    </p>
                                    <p className="text-gray-600">
                                        Prioridade: {lastCall.prioridade || "—"}
                                    </p>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Último chamado aberto:{" "}
                                        {lastCall.hora
                                            ? new Date(lastCall.hora).toLocaleString()
                                            : "agora"}
                                    </p>
                                    <p className={"mt-2 text-sm text-yellow-600 font-semibold"}>
                                        {lastCall.status === "PENDENTE" &&
                                            "Aguardando confirmação da enfermagem..."}
                                    </p>
                                    <p className={"mt-2 text-sm text-green-600 font-semibold"}>
                                        {lastCall.status === "EM ATENDIMENTO" &&
                                            "Enfermeira confirmou o atendimento ✅"}
                                    </p>
                                    <p className={"mt-2 text-sm text-green-600 font-semibold"}>
                                        {lastCall.status === "CONCLUIDO" &&
                                            "Chamado finalizado com sucesso ✅"}
                                    </p>
                                    <p className={"mt-2 text-sm text-green-600 font-semibold"}>
                                        {lastCall.status === "CANCELADO" && "Chamado cancelado ❌"}
                                    </p>
                                    {lastCall.status === "PENDENTE" && lastCall.chamadoId && (
                                        <div className="mt-3">
                                            <Button
                                                onClick={handleCancelCall}
                                                disabled={canceling}
                                                variant={"destructive"}
                                                className="px-4 py-2 rounded-lg text-white font-semibold disabled:bg-red-400 disabled:cursor-not-allowed"
                                            >
                                                {canceling ? "Cancelando..." : "Cancelar"}
                                            </Button>
                                        </div>
                                    )}
                                    {lastCall.status === "EM ATENDIMENTO" && lastCall.chamadoId && (
                                        <div className="mt-3">
                                            <button
                                                onClick={handleFinishCall}
                                                disabled={finishing}
                                                className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                                            >
                                                {finishing ? "Finalizando..." : "Finalizar chamado"}
                                            </button>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Use este botão quando o atendimento estiver concluído.
                                            </p>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    <p className="text-gray-600">Observação: nenhuma</p>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Nenhum chamado aberto ainda
                                    </p>
                                </>
                            )}
                        </section>
                        <section>
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                                Central de Atendimento
                            </h2>

                            <div className="grid grid-rows-1 gap-4">
                                <button
                                    className="flex flex-row items-center justify-center gap-1 rounded-lg shadow-md p-6 bg-green-600 hover:bg-green-700 text-white disabled:bg-green-400 disabled:cursor-not-allowed"
                                    disabled={
                                        lastCall.status === "PENDENTE" ||
                                        lastCall.status === "EM ATENDIMENTO" ||
                                        disabled
                                    }
                                    onClick={handleOpenCall}
                                >
                                    <SlCallOut className="w-10 h-10" />
                                    <div className="flex flex-col items-center">
                                        <span>Chamar Enfermeira</span>
                                        <small>Solicitar auxílio</small>
                                    </div>
                                </button>
                            </div>
                        </section>

                        <section className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
                            <PhoneCall className="w-8 h-8 text-indigo-600" />
                            <div>
                                <h3 className="text-gray-700 font-semibold">Emergência?</h3>
                                <p className="text-sm text-gray-500">
                                    Ligue para a recepção: (85) 99999-9999
                                </p>
                            </div>
                        </section>
                    </main>

                    {showCallForm && (
                        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 flex flex-col gap-4">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Novo chamado
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Selecione a prioridade e, se quiser, descreva o motivo.
                                </p>

                                <div className="grid grid-cols-3 gap-2">
                                    {tiposChamados.map((item) => {
                                        const isSelected = selectedChamado?.tipo === item.tipo;

                                        return (
                                            <button
                                                key={item.tipo}
                                                onClick={() => setSelectedChamado(item)}
                                                className={`
                                                    flex-1 py-2 rounded-lg text-white font-semibold text-xs sm:text-sm
                                                    transition transform
                                                    ${item.tipo === "AGUA"
                                                        ? "bg-blue-500"
                                                        : item.tipo === "SOS"
                                                            ? "bg-red-500"
                                                            : item.tipo === "DORES"
                                                                ? "bg-orange-500"
                                                                : item.tipo === "ATENDIMENTO"
                                                                    ? "bg-yellow-500"
                                                                    : item.tipo === "ALIMENTACAO"
                                                                        ? "bg-green-500"
                                                                        : "bg-cyan-900"
                                                    }
                                                     ${isSelected
                                                        ? "ring-2 ring-offset-2 ring-green-600 scale-105"
                                                        : "opacity-80 hover:opacity-100"
                                                    }
                                                `}
                                            >
                                                {item.tipo}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-gray-700">
                                        Observação (opcional)
                                    </label>
                                    <textarea
                                        value={observation}
                                        onChange={(e) => setObservation(e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2 text-sm min-h-[80px] outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Insira mais detalhes da sua necessidade..."
                                    />
                                </div>

                                <div className="flex justify-end gap-2 mt-2">
                                    <button
                                        onClick={() => {
                                            setShowCallForm(false);
                                            setObservation("");
                                            setSelectedChamado(undefined);
                                        }}
                                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleSendCall}
                                        disabled={!selectedChamado}
                                        className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed"
                                    >
                                        Enviar chamado
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                        Nenhum leito associado
                    </h2>
                    <p className="text-gray-600 p-4">
                        Por favor, entre em contato com algum enfermeiro para mais
                        informações.
                    </p>
                </div>
            )}

            <footer className="bg-white shadow-inner p-4 text-center text-gray-500 text-sm">
                © 2025 - Meu Leito
            </footer>
        </div>
    );
};

export default PacientesPage;
