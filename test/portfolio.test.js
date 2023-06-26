const Portfolio = require('../utils/Portfolio');

describe('Portfolio Basic Functionality', () => {
  let testInitialValues = [6000, 3000, 1000]
  let outputWeights = [0.6,0.3,0.1]
  let testSipArray = [2000,1000, 500]
  const portfolio = new Portfolio(testInitialValues);

  it('it should set weights', () => {
    expect(portfolio.assignWeights(testInitialValues).map(e => parseFloat(e.toFixed(1)))).toEqual(outputWeights);
  });

  test('it should set sip', () => {
    expect(portfolio.setSIP(testSipArray)).toBeUndefined();
  });

  it('it should add sip to value provided for Jan', () => {
    expect(portfolio.addSIP('JANUARY', 2000, 6000)).toEqual(6000);
  });

  it('it should add sip to value provided March', () => {
    expect(portfolio.addSIP('MARCH', 1000, 3300)).toEqual(4300);
  });

  it('it should multiply rate with current given amount and add current to it', () => {
    expect(portfolio.multiplyChange(21.5, 1000)).toEqual(1215);
  });
});


describe('Portfolio Functions', () => {

  let testInitialValues = [6000, 3000, 1000]
  const portfolio = new Portfolio(testInitialValues)
  portfolio.setSIP([2000,1000, 500])
  portfolio.addChange([ 4.00, 10.00, 2.00 ] ,'JANUARY' )
  portfolio.addChange([ -10.00, 40.00, 0.00 ] ,'FEBRUARY' )
  portfolio.addChange([ 12.5, 12.50, 12.50 ] ,'MARCH' )
  portfolio.addChange([ 8.00, -3.00, 7.00 ] ,'APRIL' )

  it('it should rebalance the amount according to given weights', () => {
    expect(portfolio.getRebalance()).toEqual('CANNOT_REBALANCE');
  });

  it('it should calculate MAYs asset amounts', () => {
    expect(portfolio.addChange([ 13.0, 21.00, 10.50 ] ,'MAY' )).toEqual([ 17628, 11652, 3829 ]);
  });

  it('it should calculate JUNEs asset amounts', () => {
    expect(portfolio.addChange([ 10.00, 8.00, -5.00 ] ,'JUNE' )).toEqual([ 23619, 11809, 3936 ]);
  });

  it('it should rebalance the amount acc to objects weights', () => {
    expect(portfolio.getRebalance()).toEqual('23619 11809 3936');
  });

  it('it should return balance for a given month', () => {
    expect(portfolio.getBalance('JANUARY')).toEqual('6240 3300 1020');
  });

});
