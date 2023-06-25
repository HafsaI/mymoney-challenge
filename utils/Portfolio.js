const config = require('../config');

class Portfolio{
    constructor(initialValues){
        this.currentAmounts = initialValues
        this.sip = []
        this.weights = this.assignWeights(initialValues)
        this.record = {}  
    }
    assignWeights(initialArray){
        let total = 0;
        let weights = [];
        for (let e of initialArray){
            total += e
        }
        for (let amount of initialArray){
            weights.push(amount/total)
        }
        return weights
    }
    setSIP(sipArray){
        this.sip = sipArray
    }
    addSIP(month, sip, current){
        if (month != config.months.JANUARY) {
           return current + sip
        }
        return current

    }
    multiplyChange(rateOfChange, current){
        return Math.floor((rateOfChange / 100) * current) + current
    }
    addChange(rateArray, month){
        let total = 0
        for(let i = 0; i < rateArray.length; i++){
            let rateOfChange = rateArray[i]
            if (month != config.months.JANUARY) {
                this.currentAmounts[i] += this.sip[i]
            }
            this.currentAmounts[i] += Math.floor((rateOfChange / 100) * this.currentAmounts[i])
            total += this.currentAmounts[i]
        }
        if (month == config.months.JUNE || month == config.months.DECEMBER){
            this.currentAmounts = this.doRebalance(total)
        } 
        this.record[month] =  [...this.currentAmounts]
        return this.currentAmounts
    }
    doRebalance(total){
        let current = []
        for(let i = 0; i < this.currentAmounts.length; i++){
            current[i] = Math.floor(this.weights[i] * total)
        }
        return current
    }
    getBalance(month){
        return this.record[month].join(' ') 
    }
    getRebalance(){
        if (Object.keys(this.record).length >= 12){
            return this.record[config.months.DECEMBER].join(' ')
        }
        else if (Object.keys(this.record).length >= 6){
            return this.record[config.months.JUNE].join(' ') 
        }
        else{
            return "CANNOT_REBALANCE"
        }
    }
}


module.exports = Portfolio