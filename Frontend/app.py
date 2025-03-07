from flask import Flask, request, jsonify, send_from_directory
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# 📌 Új elérési út: public/IMAGE
UPLOAD_FOLDER = 'public/IMAGE'
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

    file = request.files['file'] #request file tartalmazza az összes feltöltött file-t / 'file' meg kell egyezni az input mezoben lévovel

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename) #flask végett van rá szükség, eltávolitja a veszélyes karaktereket
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename) # hova kell menteni

        # Ellenőrzi, hogy létezik-e már a fájl
        if os.path.exists(file_path):
            return jsonify({
                "message": "A fájl már létezik",
                "status": "success",
                "file_name": filename  # Csak a fájl nevét küldjük vissza
            }), 200
        else:
            file.save(file_path)
            return jsonify({
                "message": "Fájl sikeresen feltöltve",
                "status": "success",
                "file_name": filename  # Csak a fájl nevét küldjük vissza
            }), 201

    return jsonify({"message": "Fájltípus nem engedélyezett", "status": "failed"}), 400

# 📌 Feltöltött képek elérhetősége (React a /IMAGE/<filename> URL-en éri el)
@app.route('/IMAGE/<filename>')  #get tipusu fetch
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename) #

# 📌 Futtatás
if __name__ == '__main__':   #minden fájlnak van name értéke, és ha nem importáljuk máshonnan akkor az a main lesz.
    app.run(debug=True)     #fejlesztői mod be
