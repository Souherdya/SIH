import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from keras import Sequential
from keras import LSTM, Dense, Dropout
import matplotlib.pyplot as plt


# Load the dataset
data = pd.read_csv("Dataset.csv")

# Ensure the data is in chronological order
data = data.sort_index()

# Display the first few rows
data.head()



# Normalize the data
scaler = MinMaxScaler(feature_range=(0, 1))
scaled_data = scaler.fit_transform(data.values)

# Create sequences of data
def create_sequences(data, seq_length):
    sequences = []
    labels = []
    for i in range(len(data) - seq_length):
        sequence = data[i:i + seq_length]
        label = data[i + seq_length]
        sequences.append(sequence)
        labels.append(label)
    return np.array(sequences), np.array(labels)

# Define the sequence length (e.g., 12 months for yearly sequences)
sequence_length = 12
X, y = create_sequences(scaled_data, sequence_length)


# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)





# Build the model
model = Sequential()

# Add LSTM layers
model.add(LSTM(units=50, return_sequences=True, input_shape=(X_train.shape[1], X_train.shape[2])))
model.add(Dropout(0.2))

model.add(LSTM(units=50, return_sequences=False))
model.add(Dropout(0.2))

# Add a Dense layer with one output
model.add(Dense(units=1))

# Compile the model
model.compile(optimizer='adam', loss='mean_squared_error')

# Summarize the model
model.summary()

# Train the model
history = model.fit(X_train, y_train, epochs=50, batch_size=32, validation_data=(X_test, y_test), shuffle=False)




# Make predictions
predicted = model.predict(X_test)
predicted = scaler.inverse_transform(predicted)

# Inverse transform the actual values
y_test_scaled = scaler.inverse_transform(y_test.reshape(-1, 1))

# Plot the results
plt.figure(figsize=(14, 5))
plt.plot(y_test_scaled, color='blue', label='Actual')
plt.plot(predicted, color='red', label='Predicted')
plt.title('LSTM Model Predictions')
plt.xlabel('Time')
plt.ylabel('Value')
plt.legend()
plt.show()
