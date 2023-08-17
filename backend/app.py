from flask import Flask, request, make_response, send_file, url_for
from datetime import datetime
import uuid, os, urllib.parse
app = Flask(__name__)

UPLOAD_FOLDER = 'media'

@app.route("/", methods=["GET", "POST"])
def upload_image():
    if request.method == 'POST':
        if not os.path.isdir(UPLOAD_FOLDER): os.mkdir(UPLOAD_FOLDER)

        unique_uploadFolderName = get_unique_uploadFolderName()
        if not os.path.isdir(unique_uploadFolderName): os.mkdir(unique_uploadFolderName)

        file = request.files['image']
        unique_filename = get_unique_filename(file.filename)

        file.save(os.path.join(unique_uploadFolderName, unique_filename))

        response = make_response(
            {
                'image_url':f"{request.url_root[:-1]}{url_for('show_image', folder_name=unique_uploadFolderName, file_name=unique_filename)}",
                'image_unique_name':unique_filename.replace('.', ''),
                'image_real_name':file.filename
            }
            
        )
        response.headers.set('Access-Control-Allow-Origin', '*')
        return response
    
    return '-1'

@app.route('/<path:folder_name>/<path:file_name>')
def show_image(folder_name, file_name):
    return send_file(os.path.join(folder_name, file_name))

def get_unique_filename(filename):
    return urllib.parse.quote(f"{uuid.uuid4().hex}{filename}")

def get_unique_uploadFolderName():
    return os.path.join(UPLOAD_FOLDER, datetime.now().strftime('%Y-%m-%d-%H-%M'))
