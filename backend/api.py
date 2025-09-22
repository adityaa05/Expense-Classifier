# This script creates the backend server that serves your model.
# Run this file and keep it running in the background.

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

# Initialize the Flask app
app = Flask(__name__)

# Enable CORS (Cross-Origin Resource Sharing) to allow requests
# from your frontend website, which will be running on a different address.
CORS(app)

# --- Load the Trained Model ---
# This block of code runs only once when the server starts.
try:
    # Load the saved model pipeline from the file.
    model = joblib.load('backend/expense_classifier_model.pkl')
    print("Model loaded successfully.")
except FileNotFoundError:
    print("Model file 'backend/expense_classifier_model.pkl' not found. Please run the training script first.")
    model = None
except Exception as e:
    print(f"An error occurred while loading the model: {e}")
    model = None


# --- Define the Prediction Endpoint ---
# This creates a URL endpoint at '/predict' that the website can send requests to.
@app.route('/predict', methods=['POST'])
def predict():
    """
    Receives a transaction description in a POST request,
    and returns the model's predicted category as a JSON response.
    """
    # First, check if the model was loaded correctly.
    if model is None:
        return jsonify({'error': 'Model is not loaded or failed to load.'}), 500

    # Get the JSON data sent from the website.
    data = request.get_json()
    
    # Validate the input.
    if not data or 'description' not in data:
        return jsonify({'error': 'Invalid input. A "description" field is required.'}), 400

    description = data['description']
    
    try:
        # The model's .predict() method expects a list or array of inputs.
        prediction = model.predict([description])
        
        # The prediction is an array, so we take the first element.
        category = prediction[0]
        
        # Print to the server's console for debugging.
        print(f"Received: '{description}' -> Predicted: '{category}'")
        
        # Send the prediction back to the website.
        return jsonify({'category': category})
        
    except Exception as e:
        # Handle any errors during prediction.
        print(f"An error occurred during prediction: {e}")
        return jsonify({'error': 'Failed to make a prediction.'}), 500

# --- Start the Server ---
# This part runs the web server when you execute the script.
if __name__ == '__main__':
    # 'debug=True' provides helpful error messages during development.
    # 'port=5000' specifies which port the server will listen on.
    # In production, we might want to use a different host and port
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
