import { LandingPage } from "./pages/LandingPage"
import { LoginPage } from "./pages/LoginPage"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RegistroPage } from "./pages/RegistroPage";
import { KanbanPage } from "./pages/KanbanPage";

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
        </Routes>
      </div>
    </BrowserRouter>
    
  )
}

export default App
