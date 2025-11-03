// src/api/websocket.ts
import { io } from "socket.io-client";

// ⚠️ tira o espaço que tinha no final da URL
const socket = io("ws://localhost:3500", {
    transports: ["websocket"],
    autoConnect: true, // se quiser deixar manual, põe false
});

// logs básicos
socket.on("connect", () => {
    console.log("🔌 [socket] conectado:", socket.id);
});

socket.on("disconnect", (reason) => {
    console.log("❌ [socket] desconectado:", reason);
});

// se quiser já deixar pronto pra ver qualquer erro
socket.on("connect_error", (err) => {
    console.log("⚠️ [socket] erro de conexão:", err.message);
});

// função helper pra entrar em setor
function joinSetor(setorId: number | string) {
    console.log("📤 [socket] enviando entrar_setor:", setorId);
    socket.emit("entrar_setor", { setorId });
}

export { socket, joinSetor };
