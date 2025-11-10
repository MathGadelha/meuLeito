type postLeitosInput = {
    nome: string,
    id_setor: number,
    Status: "Disponível" | "Ocupado" | "Manutenção" | "Livre",
}

export type { postLeitosInput }