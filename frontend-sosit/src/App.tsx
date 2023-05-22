import { useContext } from "react";

import { BrowserRouter } from "react-router-dom"

import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";

import { GlobalStyle } from "./styles/global";

import { PrivateRoutes } from "./Routes/private.routes";
import { PublicRoutes } from "./Routes/public.routes";

import { AuthContext } from "./context/AuthContext";


export function App() {
  
  const { auth } = useContext(AuthContext);

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <PrivateRoutes />
          {/* {auth ? <PrivateRoutes /> : <PublicRoutes />} */}
      </BrowserRouter>
      <GlobalStyle /> 
    </ThemeProvider>
  )
}