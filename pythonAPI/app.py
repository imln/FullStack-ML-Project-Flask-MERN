from flask import Flask, jsonify
import joblib
import pandas as pd
import numpy as np

app = Flask(__name__)

@app.route("/api/lng")
def lng():
    return jsonify({'name':'Lakshmi Nivas', 'age':24})


# @app.route('/api/predict', methods=['POST'])

@app.route('/api/predict')
def predict():
    # json_ = request.json
    # query_df = pd.DataFrame(json_)
    # query = pd.get_dummies(query_df)
    array = [5,3,1.0,0.0,35.0,0,0,8.0500,1.0,0.0,0.0]
    a = np.asarray(array).reshape(1,-1)
    prediction = mdl.predict(a)
    res = [int(e) for e in prediction]
    return jsonify({'prediction': res})


if __name__ == "__main__":
    mdl = joblib.load('./modelML/model_joblib.sav')
    app.run(debug=True)