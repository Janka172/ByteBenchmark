from flask import Flask, request, jsonify, send_from_directory
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS
import random
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


UPLOAD_FOLDER = 'public/IMAGE'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Ha a mappa nem létezik, hozza létre
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"message": "Nincs fájl a kérésben", "status": "failed"}), 400

    file = request.files['file'] #request file tartalmazza az összes feltöltött file-t / 'file' meg kell egyezni az input mezoben lévovel

    if file and allowed_file(file.filename):

        eredeti_filename = secure_filename(file.filename) #flask végett van rá szükség, eltávolitja a veszélyes karaktereket

        veletlen_szam = str(random.randint(100000000, 999999999)) #kilenc számjegy generálása

        aktualis_time = datetime.now()

        idoformazas = aktualis_time.strftime('%Y%m%d%H%M%S') + f'{aktualis_time.microsecond // 10000:02d}' # Formázás: YYYYMMDDHHMMSS + mikroszekundumok (2 jegyre kerekítve a század másodpercet)

        filename = f"{veletlen_szam}_{idoformazas}_{eredeti_filename}"

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


@app.route('/IMAGE/<filename>')  #get tipusu fetch
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename) 


if __name__ == '__main__':   #minden fájlnak van name értéke, és ha nem importáljuk máshonnan akkor az a main lesz.
    app.run(debug=True)     #fejlesztői mod be
