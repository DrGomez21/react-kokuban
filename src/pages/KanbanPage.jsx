import { TableroTareas } from "../components/TableroTareas";
import { Header } from "../components/Header";

export function KanbanPage() {
    return (

        <div className="container mx-auto">
            
            <Header />
            
            <div className="flex justify-center">
                <TableroTareas />
            </div>

        </div>
    )
}