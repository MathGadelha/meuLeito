type putLeitosInput = {
    nome: string,
    id_setor: number,
    Status: "Disponível" | "Ocupado" | "Manutenção" | "Livre",
}

export type { putLeitosInput }