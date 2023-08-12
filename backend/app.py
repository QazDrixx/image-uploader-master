from flask import Flask, request, make_response, send_file, url_for
from datetime import datetime
import uuid, os
app = Flask(__name__)

UPLOAD_FOLDER = 'media'

@app.route("/", methods=["GET", "POST"])
def upload_image():
    if request.method == 'POST':
        if not os.path.isdir(UPLOAD_FOLDER): os.mkdir(UPLOAD_FOLDER)

        time = datetime.now().strftime('%Y-%m-%d-%H-%M')
        current_upload_folder = os.path.join(UPLOAD_FOLDER, time)
        if not os.path.isdir(current_upload_folder): os.mkdir(current_upload_folder)

        file = request.files['image']
        unique_name = f"{uuid.uuid4().hex}{file.filename}"

        file.save(os.path.join(current_upload_folder, unique_name))

        response = make_response(
            f"{request.url_root[:-1]}{url_for('show_image', folder_name=current_upload_folder, file_name=unique_name)}"
        )
        response.headers.set('Access-Control-Allow-Origin', '*')
        return response
    
    return '-1'

@app.route('/<path:folder_name>/<path:file_name>')
def show_image(folder_name, file_name):
    return send_file(os.path.join(folder_name, file_name))