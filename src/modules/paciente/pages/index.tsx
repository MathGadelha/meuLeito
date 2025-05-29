import { Button } from "@components/ui/button";
import { Calendar, User, ClipboardCheck, Bell, PhoneCall } from "lucide-react";

const PacientesPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-white shadow-md p-4 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-800">Olá, Maria!</h1>
                    <p className="text-sm text-gray-500">Paciente do Leito 23B</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
                    M
                </div>
            </header>

            <main className="flex-1 p-6 space-y-6">
                <section className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Status Atual</h2>
                    <p className="text-gray-600">
                        Monitoramento estável, sinais vitais dentro dos parâmetros normais.
                    </p>
                    <p className="mt-2 text-sm text-gray-500">Última atualização: 27/05/2025 14:35</p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Central de Atendimento</h2>

                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            variant="outline"
                            size="lg"
                            className="flex flex-col items-center justify-center gap-1 rounded-lg shadow-md p-6 bg-white hover:bg-gray-50"
                            onClick={() => alert("Abrir rotina hospitalar")}
                        >
                            <Calendar className="w-10 h-10 text-indigo-600" />
                            <span className="text-indigo-700 font-semibold">Rotina</span>
                            <small className="text-gray-400">Ver rotina hospitalar</small>
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="flex flex-col items-center justify-center gap-1 rounded-lg shadow-md p-6 bg-white hover:bg-gray-50"
                            onClick={() => alert("Chamando enfermeira")}
                        >
                            <User className="w-10 h-10 text-green-600" />
                            <span className="text-green-700 font-semibold">Chamar Enfermeira</span>
                            <small className="text-gray-400">Solicitar auxílio imediato</small>
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="flex flex-col items-center justify-center gap-1 rounded-lg shadow-md p-6 bg-white hover:bg-gray-50"
                            onClick={() => alert("Acompanhando medicações")}
                        >
                            <ClipboardCheck className="w-10 h-10 text-yellow-600" />
                            <span className="text-yellow-700 font-semibold">Medicações</span>
                            <small className="text-gray-400">Controle e horários</small>
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="flex flex-col items-center justify-center gap-1 rounded-lg shadow-md p-6 bg-white hover:bg-gray-50"
                            onClick={() => alert("Visualizar notificações")}
                        >
                            <Bell className="w-10 h-10 text-red-600" />
                            <span className="text-red-700 font-semibold">Notificações</span>
                            <small className="text-gray-400">Avisos importantes</small>
                        </Button>
                    </div>
                </section>

                <section className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
                    <PhoneCall className="w-8 h-8 text-indigo-600" />
                    <div>
                        <h3 className="text-gray-700 font-semibold">Emergência?</h3>
                        <p className="text-sm text-gray-500">Ligue para a recepção: (85) 99999-9999</p>
                    </div>
                </section>
            </main>

            <footer className="bg-white shadow-inner p-4 text-center text-gray-500 text-sm">
                © 2025 - Meu Leito
            </footer>
        </div>
    );
};

export default PacientesPage;
