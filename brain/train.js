const brain = require('brain.js');
const fs = require('fs');

// provide optional config object, defaults shown.
const config = {
    inputSize: 20,
    inputRange: 20,
    hiddenLayers: [20, 20],
    outputSize: 20,
    learningRate: 0.01,
    decayRate: 0.999,
};

// create a simple recurrent neural network
const net = new brain.recurrent.LSTM(config);

let intentsFile = fs.readFileSync('intents.json');
let intents = JSON.parse(intentsFile);

let netTrainData = [];
intents['intents'].forEach(element => {
    netTrainData.push({
        input: element.patterns,
        output: element.responses,
    });
});

net.train(netTrainData);

// Save network state to JSON file.
const netState = net.toJSON();
fs.writeFileSync("trained-data.json",  JSON.stringify(netState), "utf-8");