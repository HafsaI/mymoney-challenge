const InputHandler = require('./utils/InputHandler')
const fs = require('fs')

const filePath = process.argv[2]
if (!filePath) {
    console.log(
      'No input file path provided. Usage: node index.js <input-file-path>'
    );
}
else{
    try {
        var inputData = fs.readFileSync(filePath, 'utf8')
        if (inputData){
            inputData = inputData.toString().trim().split('\n');
            let handler = new InputHandler(inputData)
            handler.createPortfolio().map( result => console.log(result))
        }
    } 
    catch (error) {
        console.log(error.message)
    }
}
