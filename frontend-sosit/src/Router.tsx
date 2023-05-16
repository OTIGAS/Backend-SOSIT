import { Routes, Route} from "react-router-dom"

import { CustomerDefaultLayout } from "./layouts/CustomerDefaultLayout"

import { Home } from "./pages/Home"

import { Query } from "./pages/Customer/Query/index"
import { History } from "./pages/Customer/History/index"
import { UpdateProfile } from "./pages/Customer/UpdateProfile/index"

import { Schedule } from "./pages/Company/Schedule"
import { CompanyDefaultLayout } from "./layouts/CompanyDefaultLayout"

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/" element={<CustomerDefaultLayout />}>
                <Route path="/query" element={<Query />}/>
                <Route path="/history" element={<History />}/>
                <Route path="/update-profile" element={<UpdateProfile />}/>
            </Route>

            <Route path="/" element={<CompanyDefaultLayout />}>
                <Route path="/schedule" element={<Schedule />}/>
            </Route>

        </Routes>
    )
}