import { useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { LeitoAdminLayout } from "@modules/adminLeitos/components/layout";
import { leitosAdmin } from "@modules/adminLeitos/services/getLeitos/getLeitos.dto";
import { useGetLeitos } from "@modules/adminLeitos/services/getLeitos/getLeitos.service";
import { errorHandler } from "@api/errorHandler";
import { Card } from "@components/ui/card";
import { Separator } from "@components/ui/separator";
import { FilterPopover } from "@components/filter/Filter";
import { useGetSetores } from "@modules/adminWeb/submodules/setores/services/getSetores/getSetores.service";

type FilterOptions = {
    id: string;
    label: string;
}

function QRGenerator() {
    const [fg, setFg] = useState("#111111");

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const [leitos, setLeitos] = useState<leitosAdmin[]>([]);
    const [leitoSelected, setLeitoSelected] = useState<leitosAdmin | null>(null);
    const [loading, setLoading] = useState(false);
    const [setores, setSetores] = useState<FilterOptions[]>([]);
    const [idSetor, setIdSetor] = useState<number>();

    async function listLeitos(idSetor?: number) {
        try {
            setLoading(true);
            const params = {
                nome: "",
                idSetor: idSetor,
                status: undefined,
                ativo: true
            }
            const response = await useGetLeitos.execute(params)
            setLeitos(response.data);
        } catch (error) {
            errorHandler(error);
        } finally {
            setLoading(false);
        }
    }

    async function listSetores(idSetor?: string) {
        try {
            const params = {
                nome: "",
                idSetor: idSetor,
                status: undefined,
                ativo: true
            }
            const response = await useGetSetores.execute(params)
            setSetores(response.data.map(setor => ({
                id: setor.Id.toString(),
                label: setor.Nome
            })));
        } catch (error) {
            errorHandler(error);
        }
    }

    function downloadPNG() {
        if (!canvasRef.current) return;
        const url = canvasRef.current.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = "qrcode.png";
        a.click();
    }

    function printQR() {

    }


    useEffect(() => {
        const debounce = setTimeout(() => {
            listLeitos();
        }, 750);

        return () => clearTimeout(debounce);
    }, [idSetor])

    useEffect(() => {
        listLeitos();
        listSetores();
    }, [])

    return (
        <LeitoAdminLayout>
            <div className="w-full">
                <p className="font-semibold text-xl">Gerador de QR Code</p>
                <p className="text-slate-400">Crie os QR Codes para acesso do paciente aqui.</p>
                <div className="w-full mt-8 flex flex-row gap-8">
                    <div className="w-1/2">
                        <FilterPopover
                            variant={"default"}
                            key={"filter"}
                            clickFilter={(e) => {
                                if (e.itemsOfSelect && e.itemsOfSelect.length > 0) {
                                    setIdSetor(Number(e.itemsOfSelect[0].id))
                                }
                            }}
                            style={{
                                width: "w-36",
                            }}
                            contentGroupSelect={[
                                {
                                    defaultValues: idSetor?.toString(),
                                    label: "Ordenação",
                                    data: setores,
                                },
                            ]}
                        />
                        <div className="w-full grid grid-cols-4 gap-4 mt-4">
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                leitos.map(leito => (
                                    <Card className="flex items-center justify-center p-4 hover:bg-slate-100 hover:cursor-pointer" key={leito.Id} onClick={() => setLeitoSelected(leito)}>
                                        <p>{leito.Nome}</p>
                                    </Card>
                                ))
                            )
                            }
                        </div>
                    </div>

                    <Separator orientation="vertical" />
                    <div className="w-1/2 flex flex-col items-center justify-center">

                        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center", marginTop: 8 }}>

                            <div style={{ textAlign: "center" }}>
                                {leitoSelected ? (<p>Gerando QR para o leito: <span className="font-bold">{leitoSelected.Nome}</span></p>) : leitos.length > 0 ? <p>Selecione um leito para gerar o QR Code.</p> : <p>Nenhum leito encontrado   .</p>}
                                {leitoSelected && (
                                    <>
                                        <div className="mt-8">
                                            <label style={{ display: "block", fontSize: 14, marginBottom: 6 }}>Cor do Qr Code</label>
                                            <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} style={{ width: "100%" }} />
                                        </div>
                                        <QRCodeCanvas
                                            value={"https://app-meuleito.com/paciente/" + leitoSelected.Id}
                                            size={310}
                                            level={"H"}
                                            fgColor={fg}
                                            bgColor={"#ffffff"}
                                            includeMargin
                                            ref={canvasRef}
                                        />
                                        <div className="flex gap-6 items-center justify-center">
                                            <button
                                                onClick={downloadPNG}
                                                disabled={!leitoSelected}
                                                style={{ marginTop: 8, padding: "8px 12px", borderRadius: 10, border: "1px solid #e5e7eb" }}>
                                                Baixar QR Code
                                            </button>
                                            <button
                                                onClick={printQR}
                                                disabled={!leitoSelected}
                                                style={{ marginTop: 8, padding: "8px 12px", borderRadius: 10, border: "1px solid #e5e7eb" }}>
                                                Imprimir
                                            </button>
                                        </div>
                                    </>
                                )}


                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </LeitoAdminLayout>
    );
}

export { QRGenerator }