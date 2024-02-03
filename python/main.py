from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image
import io
import openai
import requests

app = Flask(__name__)

model = tf.keras.models.load_model('./python/model/model.h5')

file_path = './python/model/labels.txt'
with open(file_path, 'r') as file:
    classnames = [line.strip() for line in file]

openai.api_key = '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'

def get_recipe(dish_name):
    recipe_response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
                {"role": "system", "content": 'You are an expert chef assistant.'},
                {"role": "user", "content": f"Give me a recipe for {dish_name} and seperate every step with a #. No need for introductions, just state the recipe."}
            ]
        )
    return recipe_response.choices[0].message['content']

# Requesting nutritional values
def get_nutrition(dish_name):
    nutrition_response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
                    {"role": "system", "content": "You are a nutrition expert."},
                    {"role": "user", "content": f"Provide the following nutritional values for {dish_name}. Nutrition values: carbs, saturated fat, protein, sugar, sodium, and calories. Give a numerical answer not a range, the unit should be grams, except for Calories which uses kcal. Do not add a whitespace between the nutritional value and the unit. Always keep the output like Carb: Saturated Fat: Protein: Sugar: Sodium: Calories: . Simply respond with the values, no other output is necessary and should be omitted"}
                ]
        )
    
    return nutrition_response.choices[0].message['content']

    
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    
    if file.filename == '':
        return 'No selected file', 400
    if file:
        # Open and preprocess the image
        img = Image.open(io.BytesIO(file.read())).convert('RGB')
        img = img.resize((224, 224))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0) / 255.0

        # Make a prediction
        prediction = model.predict(img_array)
        predicted_class_index = np.argmax(prediction, axis=1)
        predicted_class = classnames[predicted_class_index[0]]
        
        print(predicted_class)

        # Generate recipe and nutritional information
        recipe = get_recipe(predicted_class)
        nutrition = get_nutrition(predicted_class)
        
        parsed_nutrition = {}
        nutrition_lines = nutrition.split('\n')
        for line in nutrition_lines:
            if ':' in line:
                key, value = line.split(':')
                parsed_nutrition[key.strip()] = value.strip()

        print(parsed_nutrition)

        return jsonify({
            'prediction': str(predicted_class),
            'recipe': str(recipe),
            'Carb': str(parsed_nutrition['Carb']),
            'Saturated Fat': str(parsed_nutrition['Saturated Fat']),
            'Protein': str(parsed_nutrition['Protein']),
            'Sugar': str(parsed_nutrition['Sugar']),
            'Sodium': str(parsed_nutrition['Sodium']),
            'Calories': str(parsed_nutrition['Sodium'])
        })

if __name__ == '__main__':
    app.run(debug=True)



