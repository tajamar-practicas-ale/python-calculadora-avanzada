import uuid
import json
from datetime import datetime
import threading

# Crear un Lock para manejar la concurrencia
lock = threading.Lock()

def generar_id():
    """
    Genera un identificador único (UUID) para la operación.

    Retorna:
    str: El UUID generado como una cadena de caracteres.
    """
    return str(uuid.uuid4())

def registrar_operacion(operacion, parametros, resultado):
    """
    Registra una operación en el archivo 'historial.json'.

    Esta función guarda el ID único, la fecha y hora, la operación realizada,
    los parámetros de la operación y el resultado.

    Parámetros:
    operacion (str): El nombre de la operación (ej: 'sumar', 'restar').
    parametros (dict): Un diccionario con los parámetros utilizados en la operación.
    resultado (int/float): El resultado de la operación realizada.
    """
    # Generar un ID único para la operación
    operacion_id = generar_id()

    # Obtener la fecha y hora actual en formato ISO 8601
    timestamp = datetime.utcnow().isoformat() + "Z"  # UTC + formato ISO 8601

    # Crear el objeto que representa la operación
    operacion_obj = {
        "id": operacion_id,
        "timestamp": timestamp,
        "operacion": operacion,
        "parametros": parametros,
        "resultado": resultado
    }

    # Usar threading.Lock para evitar problemas de concurrencia al acceder al archivo
    with lock:
        # Intentar leer el historial desde el archivo 'historial.json'
        try:
            with open('historial.json', 'r') as file:
                historial = json.load(file)
        except FileNotFoundError:
            historial = []  # Si el archivo no existe, inicializamos como lista vacía

        # Agregar la nueva operación al historial
        historial.append(operacion_obj)

        # Guardar el historial actualizado en el archivo 'historial.json'
        with open('historial.json', 'w') as file:
            json.dump(historial, file, indent=4)

    print(f"Operación registrada: {operacion_obj}")

# Funciones para operaciones

def sumar(a, b):
    """
    Esta función recibe dos valores como parámetro
    y devuelve la suma de estos.

    Parámetros:
    a (int o float): Primer número.
    b (int o float): Segundo número.

    Retorna:
    resultado: La suma de estos.
    """
    resultado = a +b

    registrar_operacion("sumar", {"a": a, "b": b}, resultado)

    return resultado

def restar(a, b):
    """
    Esta función recibe dos valores como parámetro
    y devuelve la resta de estos.

    Parámetros:
    a (int o float): Primer número.
    b (int o float): Segundo número.

    Retorna:
    resultado: La resta de estos.
    """
    resultado = a - b

    registrar_operacion("restar", {"a": a, "b": b}, resultado)

    return resultado

def multiplicar(a, b):
    """
    Esta función recibe dos valores como parámetro
    y devuelve el producto de estos.

    Parámetros:
    a (int o float): Primer número.
    b (int o float): Segundo número.

    Retorna:
    int o float: el producto de estos.
    """
    resultado = a * b

    registrar_operacion("multiplicación", {"a":a, "b":b}, resultado)

    return resultado

def dividir(a, b):
    """
    Esta función recibe dos valores como parámetro,
    verfica que el divisor no sea 0, de lo contrario, muestra un mensaje de error
    y devuelve el cociente de estos.

    Parámetros:
    a (int o float): Primer número.
    b (int o float): Segundo número.

    Retorna:
    int o float: el cociente de estos.
    """
    if b == 0:
        raise ZeroDivisionError("Error de cálculo, división por cero no permitida")
    else:
        resultado = a /b

        registrar_operacion("división", {"a":a, "b":b}, resultado)

        return resultado

