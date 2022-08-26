const brain = require('brain.js');
const fs = require('fs');

// provide optional config object, defaults shown.
const config = {
    inputSize: 50,
    inputRange: 50,
    hiddenLayers: [50, 50],
    outputSize: 50,
    learningRate: 0.01,
    decayRate: 0.999,
};

// Create a simple recurrent neural network
const net = new brain.recurrent.LSTM(config);

// Load the trained network data from JSON file.
const netState = JSON.parse(fs.readFileSync("trained-data.json", "utf-8"));
net.fromJSON(netState);


let output = net.run(['как си бре']);
console.log(output);
