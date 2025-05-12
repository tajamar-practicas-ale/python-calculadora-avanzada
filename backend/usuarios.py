# usuarios.py
import uuid
import json

USUARIOS_FILE = "usuarios.json"

def cargar_usuarios():
    try:
        with open(USUARIOS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

def guardar_usuarios(usuarios):
    with open(USUARIOS_FILE, "w", encoding="utf-8") as f:
        json.dump(usuarios, f, indent=2)

def registrar_usuario(nombre, email, saldo):
    if "@" not in email or "." not in email.split("@")[-1]:
        raise ValueError("Formato de email incorrecto")

    usuarios = cargar_usuarios()
    if any(u["email"] == email for u in usuarios):
        raise ValueError("Email ya registrado")

    nuevo = {
        "id": str(uuid.uuid4()),
        "nombre": nombre,
        "email": email,
        "saldo": saldo
    }

    usuarios.append(nuevo)
    guardar_usuarios(usuarios)
    return nuevo

def actualizar_saldo(usuario_id, nuevo_saldo):
    usuarios = cargar_usuarios()
    actualizados = list(map(lambda u: {**u, "saldo": nuevo_saldo} if u["id"] == usuario_id else u, usuarios))
    guardar_usuarios(actualizados)
    return True

def aplicar_descuento_general(porcentaje):
    usuarios = cargar_usuarios()
    actualizados = list(map(lambda u: {**u, "saldo": round(u["saldo"] * (1 - porcentaje / 100), 2)}, usuarios))
    guardar_usuarios(actualizados)
    return actualizados
