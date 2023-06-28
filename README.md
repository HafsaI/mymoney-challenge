# MyMoney Challenge

## Problem Statement

MyMoney platform lets investors track their consolidated portfolio value across **equity**, **debt**, and **gold**. We need to
ensure that the desired allocation percentages are equal to the actual percentages invested. The desired allocation
percentage should be derived from the initial allocation made. [Detailed Problem Statement](https://codu.ai/coding-problem/mymoney)

**Your program should take as input:**

1. The money allocated in equity, debt, and gold funds.
2. Monthly SIP payments.
3. Monthly change rate (loss or growth) for each type of fund.

**The output should be:**

1. Balanced amount of each fund for a certain month.
2. Rebalanced amount of each month if applicable.

## Solution

1. OOP-Based Solution in NodeJS
2. Unit Tests in Jest
3. [Build](https://github.com/geektrust/coding-problem-artefacts/blob/master/NodeJS/README.md)

#### Input Handler Class

- It parses the user input and calls relevant methods from the Portfolio class.

#### Portfolio Class

- The constructor allocates initial funds and sets desired allocation percentages (weights) accordingly.
- Sets fixed payments (SIP) for each of the three funds.
- Calculates Monthly Balance by adding fixed amounts and monthly change.
- Rebalances portfolio for months of June and August.
- Returns appropriate results for Balance and Rebalance commands.

## Assumptions

#### From Problem Statement

1. Balances are always floored to the nearest integers.
2. The rebalancing happens on the 6th (June) and 12th (December) month.
3. The allocation always happens from January, and SIP from February.

#### Additional Assumptions Made

1. Change percentages can be declared only once a month.
2. The system only works for a single year (Jan - Dec) as there is no way to distinguish between years from the input.

## Programming Decisions

1. Private attributes defined with a # in JS for encapsulation purposes.
2. Asset amounts are stored in arrays as opposed to storing in three separate variables to facilitate the scalability of the solution for additional funds.

## Setup

To run this project, clone the project locally:

```
$ npm install
$ node geektrust.js sample_input/<input-file>
```

To test with Jest

```
$ npm run test
```
