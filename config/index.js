const config = {
    
    commands: Object.freeze({
        Allocate: 'ALLOCATE',
        Sip:      'SIP',
        Change:   'CHANGE',
        Balance:  'BALANCE',
        Rebalance:'REBALANCE'
    }),
    
    months: Object.freeze({
        JANUARY: 'JANUARY',
        FEBRUARY:  'FEBRUARY',
        MARCH: 'MARCH',
        APRIL:  'APRIL',
        MAY: 'MAY',
        JUNE: 'JUNE',
        JULY: 'JULY',
        AUGUST: 'AUGUST',
        SEPTEMBER: 'SEPTEMBER',
        OCTOBER: 'OCTOBER',
        NOVEMBER: 'NOVEMBER',
        DECEMBER: 'DECEMBER'
    }),
    
    rebalance_month_1: 'JUNE',
    rebalance_month_2: 'DECEMBER',
    no_of_months: 12,
    rebalance_message: 'CANNOT_REBALANCE',
}

module.exports = config;

