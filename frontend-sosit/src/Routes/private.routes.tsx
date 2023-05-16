import { Routes, Route} from "react-router-dom"

import { CustomerDefaultLayout } from "../layouts/CustomerDefaultLayout"
import { Query } from "../pages/Customer/Query"
import { History } from "../pages/Customer/History"
import { UpdateProfile } from "../pages/Customer/UpdateProfile"

import { CompanyDefaultLayout } from "../layouts/CompanyDefaultLayout"
import { Schedule } from "../pages/Company/Schedule"

export function PrivateRoutes() {
    return (
        <Routes>
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