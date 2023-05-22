import { List, User, Moon, SignOut } from "phosphor-react"
import { HeaderContent } from "./styles"

import { NavLink } from "react-router-dom"


export function Header() {
    return (
        <HeaderContent>
            <h1>
                <NavLink to="/" title="Home">
                    S.O.S.I.T.
                </NavLink>
            </h1>
            <nav>
                <h2>Menu</h2>
                <List size={38}/>
                <ul>
                    <li>
                        <NavLink to="#">
                            Perfil
                            <User />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="#">
                            Tema
                            <Moon />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="#">
                            Sair
                            <SignOut />
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </HeaderContent>
    )
}