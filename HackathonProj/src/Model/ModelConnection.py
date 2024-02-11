from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from flask_cors import CORS
import numpy as np
import io
import base64

app = Flask(__name__)
CORS(app)  # Enable CORS

MODEL_PATH = "/Users/alexdang/CORVue-3/HackathonProj/src/Model/cad_cnn_model_v7.h5"
model = load_model(MODEL_PATH)

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided.'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected.'}), 400
    
    if file:
        # Convert the FileStorage to a BytesIO
        file_stream = io.BytesIO(file.read())
        
        # Load the image from the BytesIO object
        img = image.load_img(file_stream, target_size=(128, 128), color_mode='grayscale')
        
        # Preprocess the image
        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        
        # Make prediction
        prediction = model.predict(img_array)
      
        result = 'Positive' if prediction[0][0] >= 0.5 else 'Negative'
     
        # Convert the image to JPEG/PNG and encode to base64
        img.seek(0)  # Reset the file pointer to the beginning of the image file
        buffered = io.BytesIO()
        img.save(buffered, format="PNG")  # Or "PNG", depending on your needs
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
        
        return jsonify({'result': result, 'image': img_str})

if __name__ == '__main__':
    app.run(debug=True)
