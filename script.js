let price = 9.7;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const moneyValue = {
  Penny: 0.01,
  Nickel: 0.05,
  Dime: 0.1,
  Quarter: 0.25,
  One: 1,
  Five: 5,
  Ten: 10,
  Twenty: 20,
  Hundred: 100
};
const moneyKeys = Object.keys(moneyValue);
const moneyValues = Object.values(moneyValue);

const calcFaceValue = (currentPrice) => {
  const faceValues = [];
  for(i = cid.length - 1; i >= 0; i--){
    if(currentPrice >= moneyValues[i]){
      Math.round((currentPrice -= moneyValues[i]) * 100) / 100;
      faceValues.push(moneyValues[i]);
      i++;
    } 
  }
  return faceValues;
}

const addEqualFaceValues = () => {
  const faceValues = calcFaceValue(price);
  const change = faceValues.reduce((accumulator, faceValue) => {
    accumulator[faceValue] = (accumulator[faceValue] || 0) + faceValue;
    return accumulator;
  }, {});
  return change;
}

const sortChange = () => {
  const change = addEqualFaceValues();
  const sortedChange = Object.entries(change).toSorted(([a,], [b,]) => a - b);
  return sortedChange;
}

const associateChange = () => {
  const sortedChange = sortChange();

  const namedChange = sortedChange.map((value, index) => {
    const newObj = {};
    for(i = 0; i < moneyValues.length; i++){
      if(value[0] === JSON.stringify(moneyValues[i])){
        newObj[moneyKeys[i]] = value[1];
      }
    }
    return newObj;
  })
  return namedChange;
}

