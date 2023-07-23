import os, uuid
from datetime import datetime
from flask import Flask,request, render_template, send_file, url_for

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = 'media\\'

@app.route("/")
def index():
    return render_template('index.html')

@app.route(f"/image_upload", methods=['POST'])
def image_upload():
    print(request.files, request.base_url)

    if request.method == 'POST': 
        if not os.path.isdir(app.config['UPLOAD_FOLDER']): os.mkdir(app.config['UPLOAD_FOLDER'])
 
        f = request.files['file']
        unique_file_name = f"{str(uuid.uuid4().hex)}{f.filename}"

        today = datetime.now().strftime('%Y-%m-%d-%H.%M')
        folder_name = os.path.join(app.config['UPLOAD_FOLDER'], today)
        
        if not os.path.isdir(folder_name): os.mkdir(folder_name)

        f.save(os.path.join(folder_name, unique_file_name))
    
    return f"{request.url_root[:-1:]}{url_for('show_image', folder_name=folder_name, image_name=unique_file_name)}"

@app.route('/<folder_name>/<image_name>', methods=['GET', 'POST'])
def show_image(folder_name, image_name):
    return send_file(os.path.join(folder_name, image_name))

if __name__ == '__main__':
    app.run(debug=True)



