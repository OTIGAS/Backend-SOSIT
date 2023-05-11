import { NavLink } from "react-router-dom"

import { ButtonQueryContent, FormContent, HomeMainContent } from "./styles"
import { useEffect } from "react"

export function Home() {
    const getCompany = async () => {
            fetch("http://localhost:3333/companies/get-all-companies/")
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                })
      }
      
      useEffect(() => {
        getCompany();
      }, []);
      
      

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
                    <input type="email" placeholder="Email: example@email.com"/>
                    <input type="password" placeholder="Senha"/>
                    <NavLink to="/">esqueceu sua senha?</NavLink>   
                </div>
                <ButtonQueryContent disabled type="submit">
                    Avançar
                </ButtonQueryContent>
            </FormContent>
        </HomeMainContent>
    )
}