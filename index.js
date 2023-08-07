const brain = require('brain.js');
const fs = require('fs'); 

const modelPath = './chatbot-model.json';
let net;

if (fs.existsSync(modelPath)) {
  // Load the existing model from the file
  const modelData = fs.readFileSync(modelPath);
  net = new brain.recurrent.LSTM();
  net.fromJSON(JSON.parse(modelData));
} else {
  // Training data
  const trainingData = [
    { input: 'hi', output: 'Hello there!' }, 
    { input: 'hello', output: 'Hi! How can I assist you?' },
    { input: 'hey', output: 'Hey! How may I help you?' },
    { input: 'how are you', output: 'I am just a bot, but thanks for asking!' },
    { input: 'what is your name', output: 'I am ChatBot, your virtual assistant.' },
    { input: 'bye', output: 'Goodbye! Have a great day!' },
    { input: 'see you later', output: 'See you later! Take care.' },
  ];

  net = new brain.recurrent.LSTM();

  net.train(trainingData, { log: true });

  const modelData = net.toJSON();
  fs.writeFileSync(modelPath, JSON.stringify(modelData));
}

function getResponse(input) {
  const output = net.run(input);
  return output;
}

// Test the chatbot
const userInput = 'Hey';
console.log(`User: ${userInput}`);
console.log(`ChatBot: ${getResponse(userInput)}`);



