import { Routes, Route} from "react-router-dom"
import { Home } from "./pages/Home"
import { Query } from "./pages/Query"
import { DefaultLayout } from "./layouts/ClientDefaultLayout"

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/query" element={<Query />}/>
            </Route>
        </Routes>
    )
}