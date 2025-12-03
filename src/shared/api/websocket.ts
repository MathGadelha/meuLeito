// src/api/websocket.ts
import { io } from "socket.io-client";

// Base do Socket.IO: SEM /api
const socket = io("https://api-meu-leito.onrender.com", {
    transports: ["websocket"],
    autoConnect: true, // mantém como está no teu fluxo
    // se no backend você tiver configurado um path diferente, ajuste aqui:
    // path: "/socket.io",
});

// Logs básicos
socket.on("connect", () => {
    console.log("🔌 [socket] conectado:", socket.id);
});

socket.on("disconnect", (reason) => {
    console.log("❌ [socket] desconectado:", reason);
});

socket.on("connect_error", (err) => {
    console.log("⚠️ [socket] erro de conexão:", err.message);
});

// Função helper pra entrar em setor
function joinSetor(setorId: number | string) {
    console.log("📤 [socket] enviando entrar_setor:", setorId);
    socket.emit("entrar_setor", { setorId });
}

export { socket, joinSetor };
