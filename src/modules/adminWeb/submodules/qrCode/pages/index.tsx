import { useRef, useState } from "react";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { AdminWebLayout } from "@modules/adminWeb/components/layout";

type Level = "L" | "M" | "Q" | "H";

function QRGenerator() {
    const [text, setText] = useState("");
    const [fg, setFg] = useState("#111111");

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);

    function downloadPNG() {
        if (!canvasRef.current) return;
        const url = canvasRef.current.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = "qrcode.png";
        a.click();
    }

    // function downloadSVG() {
    //     if (!svgRef.current) return;
    //     const svg = svgRef.current;
    //     const xml = new XMLSerializer().serializeToString(svg);
    //     const blob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
    //     const url = URL.createObjectURL(blob);
    //     const a = document.createElement("a");
    //     a.href = url;
    //     a.download = "qrcode.svg";
    //     a.click();
    //     URL.revokeObjectURL(url);
    // }

    function printQR() {
        const w = window.open("", "_blank", "noopener,noreferrer,width=600,height=800");
        if (!w) return;

        let content = "";
        if (svgRef.current) {
            const xml = new XMLSerializer().serializeToString(svgRef.current);
            content = xml;
        } else if (canvasRef.current) {
            const url = canvasRef.current.toDataURL("image/png");
            content = `<img src="${url}" alt="QR Code" />`;
        } else {
            content = "<p>QR não disponível.</p>";
        }

        // HTML minimalista de impressão (centralizado + sem margens extras)
        w.document.write(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Imprimir QR</title>
          <style>
            @page { size: auto; margin: 10mm; }
            html, body { height: 100%; }
            body { display:flex; align-items:center; justify-content:center; }
            svg, img { max-width: 90vw; max-height: 90vh; }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `);
        w.document.close();
        // aguarda o novo doc renderizar antes de chamar print
        w.onload = () => w.print();
    }

    return (
        <AdminWebLayout>
            <div style={{ fontFamily: "system-ui, sans-serif", padding: 16, maxWidth: 720 }}>
                <p className="font-semibold text-xl">Gerador de QR Code</p>
                <p className="text-slate-400">Crie os QR Codes para acesso do paciente aqui.</p>
                <div className="mt-8">
                    <label style={{ display: "block", fontSize: 14, marginBottom: 8 }}>Identificador do Leito</label>
                    <input
                        value={text}
                        type="text"
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Insira o leito"
                        style={{
                            width: "20%", padding: 10, borderRadius: 10, border: "1px solid #e5e7eb",
                            marginBottom: 12
                        }}
                    />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>

                        <div>
                            <label style={{ display: "block", fontSize: 14, marginBottom: 6 }}>Cor do Qr Code</label>
                            <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} style={{ width: "100%" }} />
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center", marginTop: 8 }}>
                        <div style={{ textAlign: "center" }}>
                            <QRCodeCanvas
                                value={"https://meuleito.com/" + text}
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
                                    disabled={!text}
                                    className={`${!text ? 'cursor-not-allowed opacity-50' : ''}`}
                                    style={{ marginTop: 8, padding: "8px 12px", borderRadius: 10, border: "1px solid #e5e7eb" }}>
                                    Baixar QR Code
                                </button>
                                <button
                                    onClick={printQR}
                                    disabled={!text}
                                    className={`${!text ? 'cursor-not-allowed opacity-50' : ''}`}
                                    style={{ marginTop: 8, padding: "8px 12px", borderRadius: 10, border: "1px solid #e5e7eb" }}>
                                    Imprimir
                                </button>
                            </div>

                        </div>

                        {/* Prévia SVG (para baixar SVG) */}
                        {/* <div style={{ textAlign: "center" }}>
                        <QRCodeSVG
                            value={text || " "}
                            size={size}
                            level={level}
                            fgColor={fg}
                            bgColor={bg}
                            includeMargin
                            ref={svgRef}
                        />
                        <button onClick={downloadSVG}
                            style={{ marginTop: 8, padding: "8px 12px", borderRadius: 10, border: "1px solid #e5e7eb" }}>
                            Baixar SVG
                        </button>
                    </div> */}
                    </div>
                </div>

            </div>
        </AdminWebLayout>
    );
}

export { QRGenerator }