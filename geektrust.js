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
        inputData = fs.readFileSync(filePath, "utf8",{flag:'r'})
        if (inputData){
            inputData = inputData.toString().trim().split('\n');
            obj = new InputHandler(inputData)
            obj.createPortfolio()
        }
    } catch (error) {
        console.log(error.message);
    }
}
