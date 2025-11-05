import { userData } from "../listProfissionais/listProfissionais.dto";

type postProfissionaisInput = {
    nome: string,
    nascimento: string,
    sexo: string,
    cpf: string,
    senha: string,
    id_perfil: number
    setores: number[]
}

type postProfissionaisOutput = {
    data: userData;
}

export type { postProfissionaisInput, postProfissionaisOutput }