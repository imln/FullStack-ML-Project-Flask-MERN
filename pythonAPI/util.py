import json
import joblib
import numpy as np
import pandas as pd
import io
import random
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
import matplotlib.pyplot as plt
import seaborn as sns

__data_columns = None
__model = None
__dataset = None


def get_passenger_survived_predict(passengerId, pclass, sex, age, sibSp, parch, fare, embarked):
    try:
        sex_index = __data_columns.index(sex)
    
    except:
        sex_index = -1

    try:
        emb_index = __data_columns.index(embarked)
    
    except:
        emb_index = -1
    
    x = np.zeros(len(__data_columns))

    x[0] = passengerId
    x[1] = pclass
    x[4] = age
    x[5] = sibSp
    x[6] = parch
    x[7] = fare

    if sex_index >= 0:
        x[sex_index] = 1
    
    if emb_index >= 0:
        x[emb_index] = 1

    a = np.asarray(x).reshape(1,-1)
    prediction = __model.predict(a)
    res = [int(e) for e in prediction]
    return res[0]

def create_age_hist_plot():
    df = pd.read_csv('./dataset/titanic.csv')
    num_cols = df.select_dtypes([np.int64,np.float64]).columns.tolist()
    num_cols.remove('PassengerId')
    fig = Figure()
    axis = fig.add_subplot(1, 1, 1)
    axis.hist(df['Age']) 
    output = io.BytesIO()
    FigureCanvas(fig).print_png(output)
    return output.getvalue()



def load_saved_data():
    print("loading saved data...start")
    global __data_columns
    global __model
    global __dataset

    with open("./dataset/columns.json", 'r') as f:
        __data_columns = json.load(f)['data_columns']

    with open("./modelML/model_joblib.sav", 'rb') as f:
        __model = joblib.load(f)

    with open("./dataset/titanic.csv", 'rb') as f:
        __dataset = pd.read_csv(f)
    print("loading saved data... done")



if __name__ == '__main__':
    load_saved_data()