import React, {useState} from "react";

export function Entrada() {

    const [username, setUsername] = useState("");

    const handleInputChange = (event) => {
        setUsername(event.target.value);
        console.log(event.target.value); // Muestra el valor en la consola
    }

    return (
        <div className="mb-4">
          <label className="block text-gray-950 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleInputChange}
          />
        </div>
    );  
}
