import { createContext, useState } from 'react'

type Costumer = {
    id: string
    nome: string
    email: string
    senha_hash: string
    cpf: string
    telefone: string
    cep: string
    estado: string
    cidade: string
    rua: string
    numero: string
    nascimento: string
}

type Company = {
    id: string
    nome_fantasia: string
    razao_social: string
    email: string
    senha_hash: string
    cnpj: string
    sobre: string
    img_perfil: string
    link_google: string
    telefone: string
    email_contato: string
    nome_contato: string
    cep: string
    estado: string
    cidade: string
    rua: string
    numero: string
}

export const AuthContext = createContext({})

type AuthProviderProps = {
    children: React.ReactNode;
};

export function AuthProvider ({ children }: AuthProviderProps) {
    const [auth, setAuth] = useState(false)
    const [user, setUser] = useState<Costumer | Company | null>(null)

    return (
        <AuthContext.Provider value={{auth, setAuth, user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}