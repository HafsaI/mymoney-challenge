const InputHandler = require('../utils/InputHandler');


describe('Parser Function', () => {
  const handler = new InputHandler();
  let output1 = [ 'ALLOCATE', [ '8000', '6000', '3500' ] ]
  let output2 = [ 'CHANGE', [ '4.00%', '10.00%', '2.00%', 'JANUARY' ] ]

  it('it should split allocate command correctly', () => {
    expect(handler.parser('ALLOCATE 8000 6000 3500')).toEqual(output1);
  });
  it('it should split change command correctly', () => {
    expect(handler.parser('CHANGE 4.00% 10.00% 2.00% JANUARY')).toEqual(output2);
  });

});

describe('Portfolio Function', () => {
  let input = [
    'ALLOCATE 6000 3000 1000\r',
    'SIP 2000 1000 500\r',
    'CHANGE 4.00% 10.00% 2.00% JANUARY\r',
    'CHANGE -10.00% 40.00% 0.00% FEBRUARY\r',
    'CHANGE 12.50% 12.50% 12.50% MARCH\r',
    'CHANGE 8.00% -3.00% 7.00% APRIL\r',
    'CHANGE 13.00% 21.00% 10.50% MAY\r',
    'CHANGE 10.00% 8.00% -5.00% JUNE\r',
    'BALANCE MARCH\r',
    'REBALANCE'
  ]
  let outputResult = ['10593 7897 2272', '23619 11809 3936']
  const handler = new InputHandler(input);
  

  it('it should create a portfolio and return final printing results', () => {
    expect(handler.createPortfolio()).toEqual(outputResult);
  });

});

