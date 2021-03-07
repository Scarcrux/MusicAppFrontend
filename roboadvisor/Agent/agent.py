import keras
from keras.models import Sequential
from keras.layers import Dense
from keras import optimizers
from keras.models import load_model
from collections import deque
import numpy as np
import random
import tensorflow as tf

class Agent:
    def __init__(self, state_size, is_eval=False, model_name=""):
        self.state_size = state_size # normalized previous days
        self.action_size = 3 # sit, buy, sell
        self.memory = deque(maxlen=1000)
        self.inventory = []
        self.model_name = model_name
        self.is_eval = is_eval

        self.gamma = 0.95
        self.epsilon = 0.3

        self.model = load_model("models/" + model_name + ".h5") if is_eval else self._model()

    def _model(self):
        hidden_size = self.state_size*2
        model = Sequential()
        model.add(Dense(hidden_size, input_shape=(self.state_size,4), activation='relu'))
        model.add(Dense(hidden_size, activation='relu'))
        model.add(Dense(self.action_size))
        op = tf.keras.optimizers.SGD(learning_rate=0.01, momentum=0.0, nesterov=False, name='SGD')
        model.compile(loss="mse", optimizer=op)
        return model

    def act(self, state):
        if not self.is_eval and random.random() <= self.epsilon:
            return random.randrange(self.action_size)

        options = self.model.predict(state)
        return np.argmax(options[0])

    def expReplay(self, batch_size):
        mini_batch = []
        l = len(self.memory)
        for i in range(l - batch_size + 1, l):
            mini_batch.append(self.memory[i])

        for state, action, reward, next_state, done in mini_batch:
            target = reward
            if not done:
                target = reward + self.gamma * np.amax(self.model.predict(next_state)[0])
            target_f = self.model.predict(state)
            target_f[0][action] = target
            self.model.fit(state, target_f, epochs=1, verbose=0)