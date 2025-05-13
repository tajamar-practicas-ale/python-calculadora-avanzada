// src/components/Historial.jsx
import axios from "axios";

export default function Historial({ historial, limpiarHistorial }) {
    const borrarHistorial = async () => {
        await axios.delete("http://localhost:5000/historial");
        limpiarHistorial();
    };

    return (
        <div className="p-4 bg-white rounded-xl shadow border">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">Historial</h2>
                <button
                    onClick={borrarHistorial}
                    className="bg-red-500 text-white cursor-pointer hover:bg-red-600 transition-colors duration-200 px-3 py-1 rounded"
                >
                    Limpiar
                </button>
            </div>
            <ul className="text-sm space-y-1">
                {historial.length === 0 && <li>No hay operaciones registradas.</li>}
                {historial.map((h) => (
                    <li key={h.id}>
                        <strong>{h.operacion}</strong>: {h.parametros.a} y {h.parametros.b} →{" "}
                        {h.resultado} ({new Date(h.timestamp).toLocaleString()})
                    </li>
                ))}
            </ul>
        </div>
    );
}
