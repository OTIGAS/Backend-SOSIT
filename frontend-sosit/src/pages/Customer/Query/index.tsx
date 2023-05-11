import { MagnifyingGlass } from "phosphor-react"
import { InputQueryContent, OptionsQueryContent, SelectQueryContent } from "./styles"

export function Query() {
    return (
        <div>
            <form action="">
                <InputQueryContent placeholder="Buscar por..." type="text" />
                <SelectQueryContent>
                    <OptionsQueryContent value="service">Serviço</OptionsQueryContent>
                    <OptionsQueryContent value="company">Empresa</OptionsQueryContent>
                </SelectQueryContent>
                <button type="submit">
                    Buscar 
                    <MagnifyingGlass size={24}/>
                </button>
            </form>
        </div>
    )
}