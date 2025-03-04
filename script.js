const purchaseBtn = document.querySelector("#purchase-btn");
const userInput = document.querySelector("#cash");
const changeDue = document.querySelector("#change-due");
const cashInDrawer = document.querySelector("#cid");

let drawerStatus;
let totalChange;
let costumerPaidWith;
let price = 0;
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
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1,
  FIVE: 5,
  TEN: 10,
  TWENTY: 20,
  'ONE HUNDRED': 100
};
const moneyKeys = Object.keys(moneyValue);
const moneyValues = Object.values(moneyValue);

const statusMessages = {
  'Open': 'Status: OPEN',
  'Close': 'Status: CLOSED',
  'Insufficient': 'Status: INSUFFICIENT_FUNDS',
  'Client cannot pay': 'Customer does not have enough money to purchase the item',
  'No change': 'No change due - customer paid with exact cash'
};

// look out for negative input!!
const getUserInput = () => {
  costumerPaidWith = Number(userInput.value);
}

const checkTotalChange = () => {
  totalChange = cid.reduce((totChange,change) => 
    totChange = Math.round((totChange + change[1]) * 100) / 100, 0);
}

const calcFaceValue = () => {
  let change = costumerPaidWith - price;
  const faceValues = [];
  checkTotalChange();

  for(i = cid.length - 1; i >= 0; i--){
    if(change >= moneyValues[i] && cid[i][1] > 0 && totalChange >= change){
      change = Math.round((change - moneyValues[i]) * 100) / 100;
      cid[i][1] = Math.round((cid[i][1] - moneyValues[i]) * 100) / 100;
      faceValues.push(moneyValues[i]);
      i++;
    } 
  }

  checkTotalChange();
  if(change > totalChange){
    drawerStatus = 'Insufficient';
  } else if(costumerPaidWith < price){
    drawerStatus = 'Client cannot pay';
  } else if(costumerPaidWith === price){
    drawerStatus = 'No change';
  } else if(totalChange === 0){
    drawerStatus = 'Close';
  } else{
    drawerStatus = 'Open';
  }
  return faceValues;
}

const addEqualFaceValues = () => {
  const faceValues = calcFaceValue();
  console.log(faceValues);
  const change = faceValues.reduce((accumulator, faceValue) => {
    accumulator[faceValue] = (accumulator[faceValue] || 0) + faceValue;
    return accumulator;
  }, {});
  return change;
}

const sortChange = () => {
  const change = addEqualFaceValues();
  console.log(change);
  const sortedChange = Object.entries(change).toSorted(([a,], [b,]) => a - b);
  return sortedChange;
}

const associateChange = () => {
  const sortedChange = sortChange();
  console.log(sortedChange);
  const namedChange = sortedChange.map((value) => {
    const newArray = [];
    for(i = 0; i < moneyValues.length; i++){
      if(value[0] === JSON.stringify(moneyValues[i])){
        newArray.push(moneyKeys[i]);
        newArray.push(value[1]);
      }
    }
    return newArray;
  })
  return namedChange;
}

const printChange = () => {
  const namedChange = associateChange();
  changeDue.innerHTML = `<div>${statusMessages[drawerStatus]}</div>`;
  namedChange.forEach(element => {
    changeDue.innerHTML += `<div>${element[0]}: $${Math.round(element[1] * 100) / 100}</div>`;
  });
}

const deleteData = () => {
  costumerPaidWith = 0;
  changeDue.innerHTML = ``;
  cashInDrawer.innerHTML = ``;
}

const printCid = () => {
  for(i = 0; i < cid.length; i++){
    cashInDrawer.innerHTML += `<div>${cid[i][0]}: ${cid[i][1]}</div>`;
    }
}

printCid();

purchaseBtn.addEventListener("click", () => {
  deleteData();
  getUserInput();
  printChange();
  printCid();
})

