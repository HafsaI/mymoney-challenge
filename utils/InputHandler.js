const Portfolio = require('./Portfolio');
const config = require('../config');
class InputHandler{
    #inputData
    constructor(input){
        this.#inputData = input
    }

    parser(input){
        //parses each input command
        let inputValues = input.trim().split(' ');
        let command = inputValues[0]
        let valuesArray = inputValues.slice(1,inputValues.length)
        return [command, valuesArray]
    }

    createPortfolio(){
        // creates portfolio acc to commands from user input
        var result = [];
        for (let i=0; i < this.#inputData.length; i++){
            var month, portfolio, intArray;
            var [command, valuesArray] = this.parser(this.#inputData[i])
            
            if (command == config.commands.Allocate){
                intArray = valuesArray.map(str => parseInt(str));
                portfolio = new Portfolio(intArray)   
            }
            if (command == config.commands.Sip){
                intArray = valuesArray.map(str => parseInt(str));
                portfolio.setSIP(intArray)
            }
            if (command == config.commands.Change){
                month = valuesArray.slice(-1)[0]
                let array = valuesArray.slice(0,-1).map(value => parseFloat(value.replace('%', '')));
                portfolio.calculateMonthBalance(array, month)   
            }
            if (command == config.commands.Balance){
                month = valuesArray.slice(-1)[0]
                let balance = portfolio.getBalance(month)
                result.push(balance)
                console.log(balance)
            }
            if (command == config.commands.Rebalance){
                let balance = portfolio.getRebalance()
                result.push(balance)
                console.log(balance)
                
            }
        }

        return result
    }
}

module.exports = InputHandler