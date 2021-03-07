import numpy as np
import pandas as pd
import math
import requests

# prints formatted price
def formatPrice(n):
    return ("-$" if n < 0 else "$") + "{0:.2f}".format(abs(n))

# returns the vector containing stock data from api
def getStockDataVec(key):
    response = requests.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol="+key+"&outputsize=full&apikey=S66FF0CP9G6NDFCT")
    d = response.json()['Time Series (Daily)']
    df = pd.DataFrame(data=d).T[['1. open', '2. high', '3. low', '4. close']]
    df.columns = ['open','high','low','close']
    df=df.iloc[0:100]
    df=df.astype(float)
    
    vec = []
    for index, row in df.iterrows():
        vec.append([row['open'], row['high'], row['low'], row['close']])
    return np.asarray(vec).astype(np.float64)

# returns the sigmoid
def sigmoid(x):
    for i in range(len(x)):
        x[i] = 1 / (1 + math.exp(-x[i]))

# returns an an n-day state representation ending at time t
def getState(data, t, n):
    d = t - n
    block = data[d:t] if d >= 0 else np.concatenate(((-d) * [data[0]] , data[0:t]), axis = 0) # pad with t0
    res = np.array([])
    for i in range(n - 1):
        diff = list(block[i + 1] - block[i])
        sigmoid(diff)
        res = np.append(res, diff)
    return np.reshape(res, (1, res.shape[0]))