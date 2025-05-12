// src/components/ListaUsuarios.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function ListaUsuarios() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/usuarios").then(({ data }) => setUsuarios(data));
    }, []);

    return (
        <div className="p-4 bg-white rounded border shadow">
            <h2 className="text-xl font-bold mb-2">Usuarios Registrados</h2>
            <ul className="text-sm space-y-1">
                {usuarios.length === 0 && <li>No hay usuarios registrados.</li>}
                {usuarios.map((u) => (
                    <li key={u.id}>
                        {u.nombre} ({u.email}) — Saldo: ${u.saldo}
                    </li>
                ))}
            </ul>
        </div>
    );
}
