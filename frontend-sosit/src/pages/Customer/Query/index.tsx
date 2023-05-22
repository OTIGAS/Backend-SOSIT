import { MagnifyingGlass } from "phosphor-react"
import { ButtonQueryContent, DivMainContent, DivResultContent, FormQueryContent, InputQueryContent, OptionsQueryContent, SelectQueryContent } from "./styles"
import { QueryResult } from "../../../components/QueryResult"

export function Query() {
    
    const dados = {
        nomeEmpresa: "Nome da Empresa",
        nomeAgenda: "Nome da Agenda",
        diaSemana: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
    };

    return (
        <DivMainContent>
            <FormQueryContent action="">
                <InputQueryContent placeholder="Buscar por..." type="text" />
                <SelectQueryContent>
                    <OptionsQueryContent value="service">Serviço</OptionsQueryContent>
                    <OptionsQueryContent value="company">Empresa</OptionsQueryContent>
                </SelectQueryContent>
                <ButtonQueryContent type="submit">
                    Buscar 
                    <MagnifyingGlass size={24}/>
                </ButtonQueryContent>
            </FormQueryContent>

            <DivResultContent>
                <QueryResult {...dados}/>
            </DivResultContent>
        </DivMainContent>
    )
}