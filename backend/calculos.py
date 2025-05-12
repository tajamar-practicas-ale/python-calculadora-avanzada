# calculos.py
import uuid
import json
import threading
from datetime import datetime

historial_lock = threading.Lock()

class ErrorCalculo(Exception):
    """Excepción personalizada para errores de cálculo."""
    def __init__(self, mensaje):
        super().__init__(mensaje)
        self.mensaje = mensaje

def registrar_historial(operacion, a, b, resultado):
    entrada = {
        "id": str(uuid.uuid4()),
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "operacion": operacion,
        "parametros": {"a": a, "b": b},
        "resultado": resultado
    }
    with historial_lock:
        try:
            with open("historial.json", "r", encoding="utf-8") as f:
                historial = json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            historial = []

        historial.append(entrada)

        with open("historial.json", "w", encoding="utf-8") as f:
            json.dump(historial, f, indent=2)

def sumar(a, b):
    """Retorna la suma de a y b."""
    resultado = a + b
    registrar_historial("sumar", a, b, resultado)
    return resultado

def restar(a, b):
    """Retorna la resta de a y b."""
    resultado = a - b
    registrar_historial("restar", a, b, resultado)
    return resultado

def multiplicar(a, b):
    """Retorna el producto de a y b."""
    resultado = a * b
    registrar_historial("multiplicar", a, b, resultado)
    return resultado

def dividir(a, b):
    """Retorna la división de a entre b. Lanza ErrorCalculo si b = 0."""
    if b == 0:
        raise ErrorCalculo("División por cero no permitida")
    resultado = a / b
    registrar_historial("dividir", a, b, resultado)
    return resultado
