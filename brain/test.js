const brain = require('brain.js');
const fs = require('fs');

// Create a simple recurrent neural network
const net = new brain.recurrent.LSTM();

// Load the trained network data from JSON file.
const netState = JSON.parse(fs.readFileSync("trained-data.json", "utf-8"));
net.fromJSON(netState);


let output = net.run('здрасти как си мое приятелче');
console.log(output);
