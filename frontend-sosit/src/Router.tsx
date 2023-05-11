import { Routes, Route} from "react-router-dom"

import { DefaultLayout } from "./layouts/ClientDefaultLayout"

import { Home } from "./pages/Home"

import { Query } from "./pages/Customer/Query/index"
import { History } from "./pages/Customer/History/index"
import { UpdateProfile } from "./pages/Customer/UpdateProfile/index"

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/query" element={<Query />}/>
                <Route path="/history" element={<History />}/>
                <Route path="/update-profile" element={<UpdateProfile />}/>
            </Route>
        </Routes>
    )
}