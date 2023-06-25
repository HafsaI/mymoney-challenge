const Portfolio = require('./Portfolio')
const config = require('../config');

class InputHandler{    
    constructor(input){
        this.inputData = input
    }

    createPortfolio(){
        // creates portfolio acc to commands from user input
        for (let i=0; i < this.inputData.length; i++){
            let month, portfolio, intArray;
            let inputValues = inputData[i].split(' ');
            let command = inputValues[0]
            let valuesArray = inputValues.slice(1,inputValues.length)
            if (command == config.commands.Allocate){
                intArray = valuesArray.map(str => parseInt(str));
                portfolio = new Portfolio(intArray)   
            }
            if (command == config.commands.Sip){
                intArray = valuesArray.map(str => parseInt(str));
                // portfolio.setSIP(intArray)
            }
            if (command == config.commands.Change){
                month = valuesArray[valuesArray.length - 1]
                let array = valuesArray.slice(0,-1).map(value => parseFloat(value.replace('%', '')));
                // portfolio.addChange(array, month)   
            }
            if (command == config.commands.Balance){
                month = valuesArray[valuesArray.length - 1]
                // console.log(portfolio.getBalance(month))
            }
            if (command == config.commands.Rebalance){
                // console.log(portfolio.getRebalance())
                
            }
        }

    }
}

module.exports = InputHandler