const config = require('../config');

class Portfolio{

    #currentAmounts
    #sip
    #weights
    #record
    
    constructor(initialValues){
        // allocate initial amounts and set desired weights accordingly
        this.#currentAmounts = [...initialValues]
        this.#sip = []
        this.#weights = this.assignWeights([...initialValues])
        this.#record = {}  
    }

    assignWeights(initialAmounts){
        // set desired weights for each asset from initial amount allocated
        let weights = [];
        let total = initialAmounts.reduce((x, y) => x + y, 0);
        for (let amount of initialAmounts){
            weights.push(amount/total)
        }
        return weights
    }

    setSIP(sipArray){
        // set fixed amount for asset investments at monthly intervals 
        this.#sip = sipArray
    }

    addSIP(month, sip, current){
        // add the fixed amount (sip) to the current amount (except Jan)
        if (month != config.months.JANUARY) {
           return current + sip
        }
        return current
    }
    
    multiplyChange(rateOfChange, currentAmount){
        // calculate new asset amount after monthly rate applied
        return Math.floor((rateOfChange / 100) * currentAmount) + currentAmount
    }

    calculateMonthBalance(rateArray, month){
        // calculate monthly balance for a given month
        let totalAmount = 0
        
        // add sip + change
        for(let i = 0; i < rateArray.length; i++){
            let rateOfChange = rateArray[i]
            this.#currentAmounts[i] = this.addSIP(month, this.#sip[i], this.#currentAmounts[i])
            this.#currentAmounts[i] = this.multiplyChange(rateOfChange, this.#currentAmounts[i])
            totalAmount += this.#currentAmounts[i]
        }
        // rebalance
        if (month == config.months.JUNE || month == config.months.DECEMBER){
            this.#currentAmounts = this.doRebalance(totalAmount)
        } 
        this.#record[month] =  [...this.#currentAmounts]

        return this.#currentAmounts
    }

    doRebalance(monthTotal){
        // calculate rebalanced amount using set weights
        let rebalanced = []
        for(let i = 0; i < this.#currentAmounts.length; i++){
            rebalanced[i] = Math.floor(this.#weights[i] * monthTotal)
        }
        return rebalanced
    }

    getBalance(month){
        // return month's balance
        return this.#record[month].join(' ') 
    }

    getRebalance(){
        // return rebalanced amount if june/dec exist in records
        let rebalance_message = "CANNOT_REBALANCE"
        if (Object.keys(this.#record).length >= config.no_of_months){
            return this.#record[config.rebalance_month_2].join(' ')
        }
        else if (Object.keys(this.#record).length >= config.no_of_months / 2){
            return this.#record[config.rebalance_month_1].join(' ') 
        }
        else{
            return rebalance_message
        }
    }

}


module.exports = Portfolio