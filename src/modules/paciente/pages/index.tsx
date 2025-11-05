import { PhoneCall } from "lucide-react";
import { SlCallOut } from "react-icons/sl";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket, joinSetor } from "@api/websocket";
import { useGetPacienteLeitos } from "@modules/leitos/services/getPacienteLeito/getPacienteLeito.service";
import { pacienteLeitoData } from "@modules/leitos/services/getPacienteLeito/getPacienteLeito.dto";

const PacientesPage = () => {
    const pageParams = useParams();
    console.log("📄 Página do paciente ID:", pageParams.id);

    const [pacienteLeito, setPacienteLeito] = useState<pacienteLeitoData>(
        {} as pacienteLeitoData
    );
    const [disabled, setDisabled] = useState(true);

    // último chamado do paciente
    const [lastCall, setLastCall] = useState<{
        chamadoId?: number;
        mensagem?: string | null;
        prioridade?: string | null;
        hora?: string;
        status?: "ABERTO" | "CONFIRMADO" | "ERRO";
    }>({});

    // 🆕 controle do “form” de chamado
    const [showCallForm, setShowCallForm] = useState(false);
    const [selectedPriority, setSelectedPriority] = useState<"ALTA" | "MEDIA" | "BAIXA">("ALTA");
    const [observation, setObservation] = useState("");

    async function getPacienteLeito() {
        try {
            if (!pageParams.id) return;
            const response = await useGetPacienteLeitos.execute(pageParams.id);
            setPacienteLeito(response.data[0]);
        } catch (error) {
            // errorHandler(error);
        }
    }

    // busca dados do leito
    useEffect(() => {
        getPacienteLeito();
    }, [pageParams.id]);

    // entrar na room do setor do paciente
    useEffect(() => {
        if (!pageParams.id) {
            console.log("⚠️ [socket] Nenhum id na rota, não vou entrar em room (paciente)");
            return;
        }

        if (!socket.connected) {
            console.log("🔁 [socket] não estava conectado, conectando... (paciente)");
            socket.connect();
        }

        if (pacienteLeito.IdSetor) {
            console.log("📤 [socket] entrando no setor (paciente):", pacienteLeito.IdSetor);
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

    // ouvir confirmações
    useEffect(() => {
        // back confirmou que criou
        const handleChamadoEnviado = (data: any) => {
            console.log("✅ [socket] chamado_enviado (paciente):", data);
            setLastCall((prev) => ({
                ...prev,
                chamadoId: data.chamadoId,
                status: "ABERTO",
            }));
            // esconde o form
            setShowCallForm(false);
            // limpa observação
            setObservation("");
        };

        // alguma enfermeira aceitou
        const handleChamadoAceito = (data: any) => {
            console.log("📩 [socket] chamado_aceito (paciente):", data);
            if (data.chamadoId === lastCall.chamadoId) {
                setLastCall((prev) => ({
                    ...prev,
                    status: "CONFIRMADO",
                }));
            }
        };

        socket.on("chamado_enviado", handleChamadoEnviado);
        socket.on("chamado_aceito", handleChamadoAceito);

        return () => {
            socket.off("chamado_enviado", handleChamadoEnviado);
            socket.off("chamado_aceito", handleChamadoAceito);
        };
    }, [lastCall.chamadoId]);

    // abrir chamado -> agora só abre o form
    const handleOpenCall = () => {
        if (disabled) return;
        setShowCallForm(true);
    };

    // enviar de verdade
    const handleSendCall = () => {
        if (!pacienteLeito.IdPaciente || !pacienteLeito.IdSetor) return;

        const payload = {
            id_paciente_leito: pacienteLeito.Id,
            setorId: pacienteLeito.IdSetor,
            prioridade: selectedPriority,
            mensagem: observation || null,
            nomePaciente: pacienteLeito.NomePaciente,
            nomeLeito: pacienteLeito.NomeLeito,
        };

        console.log("📞 emitindo novo_chamado:", payload);

        setLastCall({
            chamadoId: undefined,
            mensagem: payload.mensagem ?? undefined,
            prioridade: payload.prioridade,
            hora: new Date().toISOString(),
            status: "ABERTO",
        });

        socket.emit("novo_chamado", payload);
    };

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
                                    <p
                                        className={
                                            lastCall.status === "CONFIRMADO"
                                                ? "mt-2 text-sm text-green-600 font-semibold"
                                                : "mt-2 text-sm text-yellow-600 font-semibold"
                                        }
                                    >
                                        {lastCall.status === "CONFIRMADO"
                                            ? "Enfermeira confirmou o atendimento ✅"
                                            : "Aguardando confirmação da enfermagem..."}
                                    </p>
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
                                    disabled={disabled}
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

                    {/* 🆕 "modal" simples de prioridade + observação */}
                    {showCallForm && (
                        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 flex flex-col gap-4">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Novo chamado
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Selecione a prioridade e, se quiser, descreva o motivo.
                                </p>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setSelectedPriority("ALTA")}
                                        className={`flex-1 py-2 rounded-lg text-white font-semibold ${selectedPriority === "ALTA"
                                            ? "bg-red-500"
                                            : "bg-red-300 hover:bg-red-400"
                                            }`}
                                    >
                                        ALTA
                                    </button>
                                    <button
                                        onClick={() => setSelectedPriority("MEDIA")}
                                        className={`flex-1 py-2 rounded-lg text-white font-semibold ${selectedPriority === "MEDIA"
                                            ? "bg-yellow-500"
                                            : "bg-yellow-300 hover:bg-yellow-400"
                                            }`}
                                    >
                                        MÉDIA
                                    </button>
                                    <button
                                        onClick={() => setSelectedPriority("BAIXA")}
                                        className={`flex-1 py-2 rounded-lg text-white font-semibold ${selectedPriority === "BAIXA"
                                            ? "bg-blue-500"
                                            : "bg-blue-300 hover:bg-blue-400"
                                            }`}
                                    >
                                        BAIXA
                                    </button>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-gray-700">
                                        Observação (opcional)
                                    </label>
                                    <textarea
                                        value={observation}
                                        onChange={(e) => setObservation(e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2 text-sm min-h-[80px] outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Ex: dor, tontura, ajuda para ir ao banheiro..."
                                    />
                                </div>

                                <div className="flex justify-end gap-2 mt-2">
                                    <button
                                        onClick={() => {
                                            setShowCallForm(false);
                                            setObservation("");
                                        }}
                                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleSendCall}
                                        className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
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
                    <p className="text-gray-600">
                        Por favor, entre em contato com alguma Enfermeira para mais
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
