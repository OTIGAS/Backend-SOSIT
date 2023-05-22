import { NavLink, Outlet } from "react-router-dom"

import { LayoutContainer, NavContent } from "./styles";

import { Header } from "../../components/Header";

 export function CompanyDefaultLayout() {
    return (
        <>
            <LayoutContainer>
                <Header />
                <NavContent>
                    <NavLink to="/schedule">Agendas</NavLink>
                    <NavLink to="#">Não sei</NavLink>
                    <NavLink to="#">Não sei</NavLink>
                </NavContent>
                <main>
                    <Outlet />
                </main>
            </LayoutContainer>
        </>
    )
 }