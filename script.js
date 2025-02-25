let price = 2.77;
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
}

const calcFaceValue = (currentPrice) => {
  const values = Object.values(moneyValue);
  let faceValue = [];
  for(i = cid.length - 1; i >= 0; i--){
    if(currentPrice >= values[i]){
      Math.round((currentPrice -= values[i]) * 100) / 100;
      faceValue.push(values[i]);
      i++;
    } 
  }
  return faceValue;
};

console.log(calcFaceValue(price));