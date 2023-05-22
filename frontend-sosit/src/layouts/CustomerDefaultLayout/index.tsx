import { NavLink, Outlet } from "react-router-dom"

import { LayoutContainer, NavContent } from "./styles";

import { Header } from "../../components/Header";

 export function CustomerDefaultLayout() {
    return (
        <>
            <LayoutContainer>
                <Header />
                <NavContent>
                    <NavLink to="/query">Buscar</NavLink>
                    <NavLink to="/history">Histórico</NavLink>
                    <NavLink to="/update-profile">Perfil</NavLink>
                </NavContent>
                <main>
                    <Outlet />
                </main>
            </LayoutContainer>
        </>
    )
 }