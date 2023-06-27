const config = require('../config');

class Portfolio{

    #currentAmounts
    #sip
    #weights
    #record
    
    /** Allocates initial amounts and sets desired weights */
    constructor(initialValues){
        this.#currentAmounts = [...initialValues]
        this.#sip = new Array(initialValues.length).fill(0)
        this.#weights = this.assignWeights([...initialValues])
        this.#record = {}  
    }

    /** Sets desired weights for each asset from given asset amounts */
    assignWeights(initialAmounts){
        let total = initialAmounts.reduce((x, y) => x + y)
        let weights = initialAmounts.map(i => i / total)
        return weights
    }

    /** Set fixed amount for asset investments at monthly intervals  */
    setSIP(sipArray){
        this.#sip = sipArray
    }

    /** Add the fixed amount (sip) to the current month amount (except Jan) */
    addSIP(month, sip, currentAmount){
        if (month !== config.months.JANUARY) {
           return currentAmount + sip
        }
        return currentAmount
    }
    
    /** Calculate new asset amount after monthly rate applied */
    multiplyChange(rateOfChange, currentAmount){
        let percent = 100
        return Math.floor((rateOfChange / percent) * currentAmount) + currentAmount
    }

    /**  Calculate monthly balance for a given month */
    calculateMonthBalance(rateArray, month){
        let totalAmount = 0
        // add sip + change
        for(let i = 0; i < rateArray.length; i++){
            let rateOfChange = rateArray[i]
            this.#currentAmounts[i] = this.addSIP(month, this.#sip[i], this.#currentAmounts[i])
            this.#currentAmounts[i] = this.multiplyChange(rateOfChange, this.#currentAmounts[i])
            totalAmount += this.#currentAmounts[i]
        }
        // rebalance
        if (month === config.months.JUNE || month === config.months.DECEMBER){
            this.#currentAmounts = this.doRebalance(totalAmount)
        } 
        this.#record[month] =  [...this.#currentAmounts]

        return this.#currentAmounts
    }

    /** Calculate rebalanced amount using set weights */
    doRebalance(monthTotal){
        let rebalanced = []
        for(let i = 0; i < this.#currentAmounts.length; i++){
            rebalanced[i] = Math.floor(this.#weights[i] * monthTotal)
        }
        return rebalanced
    }

    /** Return month's balance */
    getBalance(month){
        return this.#record[month].join(' ') 
    }

    /** Return rebalanced amount if june/dec exist in records */
    getRebalance(){
        let size = Object.keys(this.#record).length 
        if (size >= config.no_of_months){
            return this.#record[config.rebalance_month_2].join(' ')
        }
        else if (size >= config.no_of_months / 2){
            return this.#record[config.rebalance_month_1].join(' ') 
        }
        else{
            return config.rebalance_message
        }
    }

}


module.exports = Portfolio