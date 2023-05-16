import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom"

import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";

import { PrivateRoutes } from "./Routes/private.routes";
import { PublicRoutes } from "./Routes/public.routes";

interface User {
  nome: string
}

let auth: User

export function App() {
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
          {auth ? <PrivateRoutes /> : <PublicRoutes />}
      </BrowserRouter>
      <GlobalStyle /> 
    </ThemeProvider>
  )
}