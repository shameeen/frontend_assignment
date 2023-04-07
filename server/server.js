const express = require('express'); 
const axios = require('axios'); 
const bodyParser = require('body-parser'); 
const fs = require('fs'); 
const app = express();
const cors = require('cors');
const { response } = require('express');



app.use(bodyParser.json());
app.use(cors());

app.post('/write-file', (req, res) => { 
const fileContent = req.body.fileContent; 
// Read the contents of the JSON file and parse it into a JavaScript object
const jsonData = fs.readFileSync('responses.json', 'utf-8');
const data = JSON.parse(jsonData);
// Check if the "responses" array exists, and create it if it doesn't
if (!data.responses) {
  data.responses = [];
}

// Add the new response to the "responses" array
data.responses.push(fileContent);

// Convert the modified JavaScript object back into a JSON string
const jsonString = JSON.stringify(data);

// Write the JSON string back to the JSON file
fs.writeFileSync('responses.json', jsonString);
res.end();
});

app.listen(3001, () => { console.log('Server running on port 3001'); 
})