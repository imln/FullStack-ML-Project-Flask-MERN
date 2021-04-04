from flask import Flask, jsonify, Response, request
import json
import joblib
import pandas as pd
import numpy as np
import util
import io
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas


app = Flask(__name__)

@app.route('/api/titanic/predict',methods=['POST'])
def predict():
    print("Api called...")
    dataML = request.json
    print(dataML)
    PassengerId, Pclass, Sex, Age, SibSp, Parch, Fare, Embarked = dataML['passengerId'], dataML['pclass'], dataML['sex'], dataML['age'], dataML['sibSp'], dataML['parch'], dataML['fare'], dataML['embarked']
    response = jsonify({
        'passengerSurvived': util.get_passenger_survived_predict(PassengerId, Pclass, Sex, Age, SibSp, Parch, Fare, Embarked)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    
    return response

@app.route("/api/titanic/plot/age_hist_plot.png")
def hist_plot_png():
    return Response(util.create_age_hist_plot(), mimetype='image/png')


@app.route("/api/hello",methods=['POST'])
def hello():
    response = jsonify({
        'api-response': 'hello i am fine ',
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response




if __name__ == "__main__":
    util.load_saved_data()
    app.run(debug=True)