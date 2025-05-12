from flask import Flask, jsonify, request 
from flask_cors import CORS
from calculos import *

app = Flask(__name__)  

CORS(app)

# Ruta de prueba para verificar que el servidor funciona  
@app.route('/health', methods=['GET'])  
def health_check():  
    return jsonify({"status": "ok", "message": "Servidor activo"}), 200  

@app.route('/sumar', methods=['POST'])
def api_sumar():
    data = request.get_json()
    print(data)
    try:
        a = data['a']
        b = data['b']
        resultado = sumar(a, b)
        return jsonify({"resultado": resultado}), 200
    except KeyError:
        return jsonify({"error": "Se deben proporcionar los parámetros 'a' y 'b'"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
@app.route('/restar', methods=['POST'])
def api_restar():
    data = request.get_json()
    try:
        a = data['a']
        b = data['b']
        resultado = restar(a, b)
        return jsonify({"resultado": resultado}), 200
    except KeyError:
        return jsonify({"error": "Se deben proporcionar los parámetros 'a' y 'b'"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
@app.route('/multiplicar', methods=['POST'])
def api_multiplicar():
    data = request.get_json()
    try:
        a = data['a']
        b = data['b']
        resultado = multiplicar(a, b)
        return jsonify({"resultado": resultado}), 200
    except KeyError:
        return jsonify({"error": "Se deben proporcionar los parámetros 'a' y 'b'"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
@app.route('/dividir', methods=['POST'])
def api_dividir():
    data = request.get_json()

    try:
        a = data['a']
        b = data['b']
        resultado = dividir(a, b)
        return jsonify({"resultado": resultado}), 200
    except KeyError:
        return jsonify({"error": "Se deben proporcionar los parámetros 'a' y 'b'"}), 400
    except ZeroDivisionError:
        return jsonify({"error": "No se puede dividir entre 0"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
if __name__ == "__main__":
    app.run(debug = True)