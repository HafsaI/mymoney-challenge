const Portfolio = require('./Portfolio');
const config = require('../config');
class InputHandler{

    #inputData
    constructor(input){
        this.#inputData = input
    }

    /** Parses each input command */
    parser(input){
        const [command, ...valuesArray] = input.trim().split(' ')
        return [command, valuesArray]
    }

    /** Creates portfolio acc to user input commands */
    createPortfolio(){
        let result = []
        let month, intArray, portfolio
        for (let i=0; i < this.#inputData.length; i++){
            let [command, valuesArray] = this.parser(this.#inputData[i])  
            
            if (command === config.commands.Allocate) {
                intArray = valuesArray.map(str => parseInt(str))
                portfolio = new Portfolio(intArray)
            } 
            else if (command === config.commands.Sip) {
                intArray = valuesArray.map(str => parseInt(str))
                portfolio.setSIP(intArray)
            } 
            else if (command === config.commands.Change) {
                // removes % sign from the rates for calculation purposes
                const array = valuesArray.slice(0, -1).map(value => parseFloat(value.replace('%', '')))
                month = valuesArray.slice(-1)[0]
                portfolio.calculateMonthBalance(array, month)
            } 
            else if (command === config.commands.Balance) {
                month = valuesArray.slice(-1)[0]
                result.push(portfolio.getBalance(month))
            } 
            else if (command === config.commands.Rebalance) {
                result.push(portfolio.getRebalance())
            }
        }

        return result
    }
}

module.exports = InputHandler