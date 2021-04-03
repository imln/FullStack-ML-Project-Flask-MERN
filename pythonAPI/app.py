from flask import Flask, jsonify, Response
import joblib
import pandas as pd
import numpy as np
import util
import io
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas


app = Flask(__name__)

@app.route('/api/titanic/predict')
def predict():
    # json_ = request.json
    # query_df = pd.DataFrame(json_)
    # query = pd.get_dummies(query_df)
    PassengerId, Pclass, Sex, Age, SibSp, Parch, Fare, Embarked = 5,3,'Sex_female',20,1,0,250,'Embarked_C'
    response = jsonify({
        'passenger_survived': util.get_passenger_survived_predict(PassengerId, Pclass, Sex, Age, SibSp, Parch, Fare, Embarked)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route("/api/titanic/plot/age_hist_plot.png")
def hist_plot_png():
    return Response(util.create_age_hist_plot(), mimetype='image/png')




if __name__ == "__main__":
    util.load_saved_data()
    app.run(debug=True)