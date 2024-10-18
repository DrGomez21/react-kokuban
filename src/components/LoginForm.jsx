import React, { useState } from "react";
import { Link } from "react-router-dom";

export function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    console.log("Username:", username);
    console.log("Password:", password);
    alert(`Username: ${username}\nPassword: ${password}`);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#E7E6EF]">
      <div className="bg-white shadow-[.5rem_.5rem_#121212] border-4 border-black p-8 max-w-sm w-full">
        <img src="/Kokuban-logo-full.png" alt="Logooooo" className="mb-8 self-center" />
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-[#121212] text-sm mb-2 montserrat-semibold" htmlFor="username">
              Nombre de usuario
            </label>
            <input
              className="shadow-[.2rem_.2rem_#121212] hover:shadow-[.4rem_.4rem_#121212] duration-150 appearance-none border-2 border-black w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-[#121212] text-sm mb-2 montserrat-semibold" htmlFor="password">
              Contraseña
            </label>
            <input
              className="shadow-[.2rem_.2rem_#121212] hover:shadow-[.4rem_.4rem_#121212] duration-150 appearance-none border-2 border-black w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Link to={"/tablero"} className="w-full">
              <button
                className="bg-[#B2FF9E] hover:shadow-[.4rem_.4rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none w-full"
                type="submit"
              >
                Iniciar sesión
              </button>
            </Link>
          </div>
        </form>

        <div className="mt-4 flex justify-center">
          <Link to="/registro">
            <button className="bg-[#EFE6FD] text-black hover:shadow-[.4rem_.4rem_#121212] montserrat-medium duration-150 py-2 px-4 border-2 border-[#121212] rounded-sm focus:outline-none focus:shadow-outline">
              Crear cuenta
            </button>
          </Link>
          
        </div>
      
      </div>
    </div>
  );
}

