const fs = require('fs');
require('dotenv').config()

const jsonData = process.env.GOOGLE_API_JSON;
const jsonObj = JSON.parse(jsonData);
console.log(jsonObj)
const jsonContent = JSON.stringify(jsonObj);
console.log(jsonContent)

fs.writeFile("apiGoogleconfig.json", jsonContent, 'utf-8', function (err) {
    if (err) {
        console.log("Error occured while writing json file.");
        return console.log(err);
    }

    console.log("JSON file has been saved.");
});