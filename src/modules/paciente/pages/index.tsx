import { PhoneCall } from "lucide-react";
import { SlCallOut } from "react-icons/sl";
// import { useState } from "react";
// import { ObservationDialog } from "../components/observationDialog";
// import toast from "react-hot-toast";
import { MdOutlineRestaurantMenu } from "react-icons/md";

const PacientesPage = () => {

    // const [openObservations, setOpenObservations] = useState(false);

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
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Último chamado</h2>
                    <p className="text-gray-600">
                        Observação: nenhuma
                    </p>
                    <p className="mt-2 text-sm text-gray-500">Última chamado aberto: 22/09/2025 21:35</p>
                </section>
                <section>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Central de Atendimento</h2>

                    <div className="grid grid-rows-2 gap-4">
                        <button
                            className="flex flex-row items-center bg-indigo-600 justify-center gap-1 rounded-lg shadow-md p-6 text-white"
                            onClick={() => alert("Abrir rotina hospitalar")}
                        >
                            <MdOutlineRestaurantMenu className="w-10 h-10" />
                            <div className="flex flex-col items-center">
                                <span>Rotina</span>
                                <small>Ver rotina hospitalar</small>
                            </div>

                        </button>

                        <button
                            className="flex flex-row items-center justify-center gap-1 rounded-lg shadow-md p-6 bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => console.log(true)}
                        >
                            <SlCallOut className="w-10 h-10" />
                            <div className="flex flex-col items-center">
                                <span>Chamar Enfermeira</span>
                                <small>Solicitar auxílio imediato</small>
                            </div>
                        </button>
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
            {/* {
                openObservations && (
                    <ObservationDialog
                        isOpen={openObservations}
                        onOpenChange={setOpenObservations}
                        success={() => {
                            setOpenObservations(false);
                            toast.success("Chamado enviado com sucesso!");
                        }}
                    />
                )
            } */}
        </div >
    );
};

export default PacientesPage;
