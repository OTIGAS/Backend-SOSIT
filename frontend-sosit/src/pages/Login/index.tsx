import { useState } from 'react'
import { NavLink } from "react-router-dom"

import { ButtonQueryContent, FormContent, HomeMainContent } from "./styles"

function initialState() {
    return { email: "", password: "" }
}

export function Login() { 
    
    const [values, setValues] = useState(initialState)

    function onChange(event: any) {
        const { value, name } = event.target;

        setValues({
            ...values,
            [name]: value
        })
    }

    return (
        <HomeMainContent>
            <div className="description-content">
                <h1>Service Organization Schedule Intelligence of Things</h1>
                <p>Bem-vindo ao SOSIT, a plataforma de agendamento inteligente para empresas e clientes. Com o SOSIT, empresas podem registrar seus serviços e horários disponíveis para agendamento, enquanto os clientes podem facilmente encontrar e agendar compromissos de forma rápida e conveniente. Cadastre-se agora e comece a gerenciar seus compromissos de maneira eficiente!</p>
                <div>
                    <h2>Empresa</h2>
                    <p>Com SOSIT, sua empresa pode gerenciar suas agendas e compromissos com facilidade. Defina seus horários e serviços disponíveis e permita que seus clientes agendem online, de forma rápida e conveniente. Além disso, a plataforma oferece recursos personalizáveis para atender às necessidades específicas de sua empresa. Cadastre-se agora e experimente o poder da organização inteligente de agendamentos.</p>
                    <button>
                        <NavLink to="/" title="Cadastro de Empresa">
                            Cadastre-se
                        </NavLink>
                    </button>
                </div>
                <div>
                    <h2>Cliente</h2>    
                    <p>Agendar compromissos nunca foi tão fácil! Com SOSIT, você pode encontrar os melhores horários e datas disponíveis para seus compromissos, sem precisar ligar para várias empresas ou esperar por uma resposta. Com apenas alguns cliques, você pode agendar online, diretamente com a empresa escolhida. Experimente agora mesmo e descubra como é fácil gerenciar seus compromissos de forma eficiente.</p>
                    <button>
                        <NavLink to="/" title="Cadastro de Cliente">
                            Cadastre-se
                        </NavLink>
                    </button>
                </div>

            </div>
            <FormContent action="">
                <label>Fazer Login</label>
                <div>
                    <input 
                        id="email" 
                        type="email" 
                        name="email" 
                        placeholder="Email: example@email.com" 
                        onChange={onChange}
                        value={values.email}
                    />
                    <input 
                        id="password" 
                        type="password" 
                        name="password" 
                        placeholder="Senha" 
                        onChange={onChange}
                        value={values.password}
                    />
                    <NavLink to="/">esqueceu sua senha?</NavLink>   
                </div>
                <ButtonQueryContent type="button">
                    Avançar
                </ButtonQueryContent>
            </FormContent>
        </HomeMainContent>
    )
}