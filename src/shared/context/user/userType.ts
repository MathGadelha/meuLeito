type userType = {
    id: number,
    login: string,
    perfil: string,
    permissoes: string[]
    setores: setorData[]
}

type setorData = {
    Id: number,
    Nome: string
}

export type { userType, setorData };