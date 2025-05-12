// src/components/Calculadora.jsx
import { useState } from "react";
import axios from "axios";

export default function Calculadora() {
    const [a, setA] = useState("");
    const [b, setB] = useState("");
    const [operacion, setOperacion] = useState("sumar");
    const [resultado, setResultado] = useState(null);
    const [error, setError] = useState("");

    const calcular = async () => {
        try {
            const { data } = await axios.post("http://localhost:5000/calcular", {
                a: Number(a),
                b: Number(b),
                operacion,
            });
            setResultado(data.resultado);
            setError("");
        } catch (err) {
            setError(err.response?.data?.error || "Error al calcular");
        }
    };

    return (
        <div className="p-4 bg-white border w-[300px] mx-auto rounded-xl shadow">
            <h2 className="text-xl text-center font-bold mb-4">Calculadora</h2>
            <div className="flex flex-col gap-5 mb-2 w-full items-center">
                <select
                    className="border p-2 rounded w-64"
                    value={operacion}
                    onChange={(e) => setOperacion(e.target.value)}
                >
                    <option value="sumar">Sumar</option>
                    <option value="restar">Restar</option>
                    <option value="multiplicar">Multiplicar</option>
                    <option value="dividir">Dividir</option>
                </select>
                <input
                    type="number"
                    className="border p-2 rounded w-64"
                    value={a}
                    onChange={(e) => setA(e.target.value)}
                    placeholder="Primer número"
                    required
                />
                <input
                    type="number"
                    className="border p-2 rounded w-64"
                    value={b}
                    onChange={(e) => setB(e.target.value)}
                    placeholder="Segundo número"
                    required
                />
                <button onClick={calcular} className="bg-blue-500 text-white px-4 py-2 rounded w-30">
                    Calcular
                </button>
            </div>
            {resultado !== null && <p className="mt-2">Resultado: <strong>{resultado}</strong></p>}
            {error && <p className="mt-2 text-red-500">{error}</p>}
        </div>
    );
}
