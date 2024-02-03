from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image
import io

app = Flask(__name__)

model = tf.keras.models.load_model('model/food101-EfficientNetB1.h5')

file_path = 'model/labels.txt'

with open(file_path, 'r') as file:
    classnames = [line.strip() for line in file]

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    
    if file.filename == '':
        return 'No selected file', 400
    if file:
        # Open and preprocess the image
        img = Image.open(io.BytesIO(file.read()))
        img = img.resize((224, 224))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = img_array / 255.0

        # Make a prediction
        prediction = model.predict(img_array)
        predicted_class_index = np.argmax(prediction, axis=1)
        predicted_class = classnames[predicted_class_index[0]]

        return jsonify({'prediction': str(predicted_class)})

if __name__ == '__main__':
    app.run(debug=True)
    
# For testing
# img_path = 'img.jpeg'
# img = image.load_img(img_path, target_size=(224, 224))