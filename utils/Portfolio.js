const config = require('../config');

class Portfolio{
    #currentAmounts
    #sip
    #weights
    #record
    constructor(initialValues){
        // allocates initial amounts and sets weights accordingly
        this.#currentAmounts = [...initialValues]
        this.#sip = []
        this.#weights = this.assignWeights([...initialValues])
        this.#record = {}  
    }

    assignWeights(initialArray){
        // sets desired weights for each asset from initial allocation
        let total = 0;
        let weights = [];
        let e;
        initialArray.map(e => total += e)
        for (let amount of initialArray){
            weights.push(amount/total)
        }
        return weights
    }
    setSIP(sipArray){
        // sets monthly payments for each asset 
        this.#sip = sipArray
    }
    addSIP(month, sip, current){
        // add sip for the given month except Jan
        if (month != config.months.JANUARY) {
           return current + sip
        }
        return current

    }
    multiplyChange(rateOfChange, current){
        // calculate new amount after rate applied
        return Math.floor((rateOfChange / 100) * current) + current
    }
    addChange(rateArray, month){
        // calculate monthly assets' amounts
        let total = 0
        
        for(let i = 0; i < rateArray.length; i++){
            let rateOfChange = rateArray[i]
            this.#currentAmounts[i] = this.addSIP(month, this.#sip[i], this.#currentAmounts[i])
            this.#currentAmounts[i] = this.multiplyChange(rateOfChange, this.#currentAmounts[i])
            total += this.#currentAmounts[i]
        }
        // rebalance
        if (month == config.months.JUNE || month == config.months.DECEMBER){
            this.#currentAmounts = this.doRebalance(total)
        } 
        this.#record[month] =  [...this.#currentAmounts]
        return this.#currentAmounts
    }
    doRebalance(total){
        let current = []
        for(let i = 0; i < this.#currentAmounts.length; i++){
            current[i] = Math.floor(this.#weights[i] * total)
        }
        return current
    }
    getBalance(month){
        // returns month's balance
        return this.#record[month].join(' ') 
    }
    getRebalance(){
        // returns rebalanced amount if june/dec exists in records
        let rebalance_message = "CANNOT_REBALANCE"
        let no_of_months = 12
        if (Object.keys(this.#record).length >= no_of_months){
            return this.#record[config.rebalance_month_2].join(' ')
        }
        else if (Object.keys(this.#record).length >= no_of_months / 2){
            return this.#record[config.rebalance_month_1].join(' ') 
        }
        else{
            return rebalance_message
        }
    }

}


module.exports = Portfolio