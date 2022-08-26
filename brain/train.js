const brain = require('brain.js');
const fs = require('fs');

// provide optional config object, defaults shown.
const options = {
    // Defaults values --> expected validation
    iterations: 200,    // the maximum times to iterate the training data --> number greater than 0
    errorThresh: 0.005,   // the acceptable error percentage from training data --> number between 0 and 1
    log: false,           // true to use console.log, when a function is supplied it is used --> Either true or a function
    logPeriod: 10,        // iterations between logging out --> number greater than 0
    learningRate: 0.3,    // scales with delta to effect training rate --> number between 0 and 1
    momentum: 0.1,        // scales with next layer's change value --> number between 0 and 1
    callback: console.log,       // a periodic call back that can be triggered while training --> null or function
    callbackPeriod: 10,   // the number of iterations through the training data between callback calls --> number greater than 0
    timeout: 60000     // the max number of milliseconds to train for --> number greater than 0
};

// create a simple recurrent neural network
const net = new brain.recurrent.LSTM(options);

let intentsFile = fs.readFileSync('intents.json');
let intents = JSON.parse(intentsFile);

let netTrainData = [];
intents['intents'].forEach(element => {

    element.patterns.forEach(function(pattern, i) {
        if (!element.responses[i]) {
            return;
        }
        netTrainData.push({
            input: pattern,
            output: element.responses[i],
        });
    });
});

net.train(netTrainData);

// Save network state to JSON file.
const netState = net.toJSON();
fs.writeFileSync("trained-data.json",  JSON.stringify(netState), "utf-8");