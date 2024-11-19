from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
 
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="e-commerce"
)
 
cursor = db.cursor(dictionary=True)
 
#login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
 
    if not email or not password:
        return jsonify({'message': 'Faltan datos del usuario'}), 400
 
    # Ejecuta la consulta para buscar el usuario
    cursor.execute("SELECT * FROM customers WHERE email = %s AND password = %s", (email, password))
    user = cursor.fetchone()
 
    # Imprime el resultado de la consulta para depuración
    print("Resultado de la consulta:", user)
 
    if user:
        return jsonify({'message': 'Login exitoso'}), 200
    else:
        return jsonify({'message': 'Credenciales incorrectas'}), 401
    
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    address = data.get('address')

    if not email or not password or not name or not address:
        return jsonify({'message': 'Faltan datos para el registro'}), 400

    # Verifica si el usuario ya existe
    cursor.execute("SELECT * FROM customers WHERE email = %s", (email,))
    existing_user = cursor.fetchone()

    if existing_user:
        return jsonify({'message': 'El usuario ya existe'}), 409

    # Inserta el nuevo usuario en la base de datos
    cursor.execute("INSERT INTO customers (name, email, password, address) VALUES (%s, %s, %s, %s)", (name, email, password, address))
    db.commit()

    return jsonify({'message': 'Usuario creado exitosamente'}), 201

@app.route('/comments', methods=['POST'])
def comments():
    data = request.json
    name = data.get('name')
    lastname = data.get('lastname')
    city = data.get('city')
    email = data.get('email')
    comments = data.get('comments')

    if not email or not name or not city or not lastname or not comments:
        return jsonify({'message': 'Faltan datos para el registro'}), 400

    # Inserta el nuevo usuario en la base de datos
    cursor.execute("INSERT INTO comments (name, lastname, city, email, comment) VALUES (%s, %s, %s, %s, %s)", (name, lastname, city, email, comments))
    db.commit()

    return jsonify({'message': 'Comentario creado exitosamente'}), 201

@app.route('/pedidos', methods=['POST'])
def pedidos():
    data = request.json
    valor = data.get('valor')
    fecha = data.get('fecha')
    usuario = data.get('usuario')

    if not valor or not fecha or not usuario:
        return jsonify({'message': 'Faltan datos para el registro'}), 400

    # Inserta el nuevo usuario en la base de datos
    cursor.execute("INSERT INTO pedidos (valor, fecha, usuario) VALUES (%s, %s, %s)", (valor, fecha, usuario))
    db.commit()

    return jsonify({'message': 'Pedido creado exitosamente'}), 201
 
@app.route('/products', methods=['GET'])
def get_products():
    cursor.execute("SELECT * FROM products")
    products = cursor.fetchall()
    return jsonify(products), 200

@app.route('/pedidos/<user>', methods=['GET'])
def get_orders(user):
    try:
        # Consulta con el usuario enviado como parámetro
        cursor.execute("SELECT * FROM pedidos WHERE usuario = %s", (user,))
        orders = cursor.fetchall()

        if not orders:
            return jsonify({'message': 'No se encontraron pedidos para este usuario'}), 404

        return jsonify(orders), 200

    except Exception as e:
        print(e)
        return jsonify({'message': 'Error al obtener los pedidos', 'error': str(e)}), 500

 
if __name__ == '__main__':
    app.run(debug=True)