import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC
import joblib

def train_and_save_best_model():
    print("--- Training and Saving the Final Model ---")

    try:
        df = pd.read_csv('cleaned_transactions(1).csv')
        print("Cleaned dataset loaded successfully.")
    except FileNotFoundError:
        print("Error: 'cleaned_transactions(1).csv' not found. Make sure it's in the same folder as this script.")
        return

    df['subcategory'].fillna('', inplace=True)
    df['note'].fillna('', inplace=True)
    df['description'] = df['subcategory'] + ' ' + df['note']
    
    model_df = df[['description', 'category']].copy()
    
    model_df.dropna(subset=['category'], inplace=True)
    model_df = model_df[model_df['description'].str.strip() != '']
    
    print(f"Training the model with {model_df.shape[0]} data points.")

    X = model_df['description']
    y = model_df['category']

    final_model_pipeline = Pipeline([
        ('tfidf', TfidfVectorizer(stop_words='english', ngram_range=(1, 2))),
        ('clf', LinearSVC(random_state=42, C=1, dual=True)),
    ])

    print("Training the final model on all available data...")
    final_model_pipeline.fit(X, y)
    print("Model training complete.")

    joblib.dump(final_model_pipeline, 'expense_classifier_model.pkl')
    print("Final model saved successfully as 'expense_classifier_model.pkl'")

if __name__ == '__main__':
    train_and_save_best_model()
