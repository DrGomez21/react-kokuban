import { TableroTareas } from "../components/TableroTareas";
import { Header } from "../components/Header";
import { useLocation } from "react-router-dom";
export function KanbanPage() {

    const location = useLocation()
    const { token } = location.state || {}  // Acá está el token

    return (

        <div className="container mx-auto">
            
            <Header />
            
            <div className="flex justify-center">
                <TableroTareas />
            </div>

        </div>
    )
}