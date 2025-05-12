# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from calculos import sumar, restar, multiplicar, dividir, ErrorCalculo
from usuarios import registrar_usuario
import json

app = Flask(__name__)

CORS(app)

@app.route("/calcular", methods=["POST"])
def calcular():
    data = request.get_json()
    operacion = data.get("operacion")
    a = data.get("a")
    b = data.get("b")

    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
        return jsonify({"error": "Los parámetros deben ser números"}), 400

    operaciones = {
        "sumar": sumar,
        "restar": restar,
        "multiplicar": multiplicar,
        "dividir": dividir
    }

    if operacion not in operaciones:
        return jsonify({"error": "Operación no válida"}), 400

    try:
        resultado = operaciones[operacion](a, b)
        return jsonify({"resultado": resultado})
    except ErrorCalculo as e:
        return jsonify({"error": str(e)}), 400

@app.route("/historial", methods=["GET"])
def historial():
    tipo = request.args.get("operacion")
    try:
        with open("historial.json", "r", encoding="utf-8") as f:
            historial = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        historial = []

    if tipo:
        historial = [h for h in historial if h["operacion"] == tipo]

    historial_ordenado = sorted(historial, key=lambda h: h["timestamp"], reverse=True)[:10]
    return jsonify(historial_ordenado)

@app.route("/historial", methods=["DELETE"])
def limpiar_historial():
    with open("historial.json", "w", encoding="utf-8") as f:
        json.dump([], f)
    return jsonify({"mensaje": "Historial eliminado exitosamente"})


@app.route("/usuarios/registro", methods=["POST"])
def registro():
    data = request.get_json()
    nombre = data.get("nombre")
    email = data.get("email")
    saldo = data.get("saldo")

    if not nombre or not email or saldo is None:
        return jsonify({"error": "Faltan campos requeridos"}), 422

    try:
        usuario = registrar_usuario(nombre, email, saldo)
        return jsonify({"id": usuario["id"], "mensaje": "Usuario registrado"})
    except ValueError as e:
        return jsonify({"error": str(e)}), 422
    
@app.route("/usuarios", methods=["GET"])
def obtener_usuarios():
    from usuarios import cargar_usuarios
    return jsonify(cargar_usuarios())


@app.errorhandler(Exception)
def error_global(error):
    return jsonify({"error": str(error)}), 500

if __name__ == "__main__":
    app.run(debug=True)
