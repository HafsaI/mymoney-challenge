const config = require('../config');

class Portfolio{
    constructor(initialValues){
        this.currentAmounts = initialValues
        this.sip = []
        this.weights = []
        this.record = {}  
    }
}


module.exports = Portfolio