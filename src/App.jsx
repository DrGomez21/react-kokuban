import { LandingPage } from "./pages/LandingPage"
import { LoginPage } from "./pages/LoginPage"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RegistroPage } from "./pages/RegistroPage";
import { KanbanPage } from "./pages/KanbanPage";
import { Toaster } from "react-hot-toast";
import { EspaciosPage } from "./pages/EspaciosPage";

function App() {
  return (
    <BrowserRouter>
    <div>
        <Routes>
          <Route path="/" element={<Navigate to="/home"/> }/>
          <Route path="/home" element={ <LandingPage /> }/>
          <Route path="/login" element={ <LoginPage /> }/>
          <Route path="/registro" element={ <RegistroPage /> }/>
          <Route path="/tablero" element={ <KanbanPage /> }/>
          <Route path="/espacios" element={ <EspaciosPage /> } />
        </Routes>
      </div>
      <Toaster />
    </BrowserRouter>
    
  )
}

export default App
