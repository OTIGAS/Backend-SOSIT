import { useEffect, useState, createContext, ReactNode } from 'react'

interface Customer {
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

interface Company {
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

interface UserContextType {
    user: Customer[] | Company[],
    handleLogin: (email: string, password: string) => Promise<void>
}

interface UserProviderProps {
    children: ReactNode
}


export const UserContext = createContext({} as UserContextType)



export function UserProvider({ children }: UserProviderProps) {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    async function authenticateUser() {
        const response = await fetch('http://localhost:3333/companies/get-all-companies/')
        const data = await response.json()

        console.log(data.companies)
    }

    useEffect(() => {
        authenticateUser()
    }, [])

    async function handleLogin(email: string, password: string) {
        console.log(email, password)
    }

    return (
        <UserContext.Provider value={{ user: [], handleLogin }}>
            {children}
        </UserContext.Provider>
    )
}