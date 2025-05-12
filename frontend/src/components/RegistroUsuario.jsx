// src/components/RegistroUsuario.jsx
import { useState } from "react";
import axios from "axios";

export default function RegistroUsuario() {
    const [form, setForm] = useState({ nombre: "", email: "", saldo: "" });
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:5000/usuarios/registro", {
                ...form,
                saldo: parseFloat(form.saldo),
            });
            setMensaje(data.mensaje);
            setForm({ nombre: "", email: "", saldo: "" });
        } catch (err) {
            setMensaje(err.response?.data?.error || "Error al registrar");
        }
    };

    return (
        <div className="p-4 bg-white border rounded shadow">
            <h2 className="text-xl font-bold mb-2">Registro de Usuario</h2>
            <form onSubmit={handleSubmit} className="space-y-2">
                <input
                    className="border p-2 w-full rounded"
                    placeholder="Nombre"
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                />
                <input
                    className="border p-2 w-full rounded"
                    placeholder="Email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    className="border p-2 w-full rounded"
                    placeholder="Saldo"
                    type="number"
                    value={form.saldo}
                    onChange={(e) => setForm({ ...form, saldo: e.target.value })}
                />
                <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">
                    Registrar
                </button>
                {mensaje && <p className="text-sm mt-2">{mensaje}</p>}
            </form>
        </div>
    );
}
