// src/components/Calculadora.jsx
import { useState } from "react";
import axios from "axios";

export default function Calculadora({ calc }) {
    const [a, setA] = useState("");
    const [b, setB] = useState("");
    const [operacion, setOperacion] = useState("sumar");
    const [resultado, setResultado] = useState(null);
    const [error, setError] = useState("");

    // Evitar que se ingrese valores que no sean numéricos y que se calcule sin valores
    const esValido = !isNaN(a) && !isNaN(b) && a !== "" && b !== "";

    const calcular = async () => {
        // if (!esValido) return;

        try {
            const { data } = await axios.post("http://localhost:5000/calcular", {
                a: parseFloat(a),
                b: parseFloat(b),
                operacion,
            });
            console.log("Respuesta del backend:", data);
            setResultado(data.resultado);
            setError("");

            // Llamar a la función para actualizar el historial
            if (calc) calc();
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
                <button onClick={calcular} className={`px-4 py-2 rounded transition-colors ${esValido
                    ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"}`} disabled={!esValido}>
                    Calcular
                </button>
            </div>
            {resultado !== null && <p className="mt-2">Resultado: <strong>{resultado}</strong></p>}
            {error && <p className="mt-2 text-red-500">{error}</p>}
        </div>
    );
}
