from flask import Flask, request, jsonify, send_from_directory
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS

# Flask alkalmazás létrehozása
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


# 📌 UPLOAD_FOLDER beállítás
UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# 📌 Megengedett fájltípusok
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Ha a mappa nem létezik, hozza létre
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# 📌 Ellenőrzi, hogy a fájl engedélyezett-e
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# 📌 Képfeltöltés (React-ből érkező fájlok fogadása)
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"message": "Nincs fájl a kérésben", "status": "failed"}), 400

    file = request.files['file']

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # 📌 Teljes elérési út visszaküldése a React-nek
        return jsonify({
            "message": "Fájl sikeresen feltöltve",
            "status": "success",
            "file_url": f"http://127.0.0.1:5000/uploads/{filename}"
        }), 201

    return jsonify({"message": "Fájltípus nem engedélyezett", "status": "failed"}), 400

# 📌 Feltöltött képek elérhetősége
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# 📌 Futtatás
if __name__ == '__main__':
    app.run(debug=True)
