const purchaseBtn = document.querySelector("#purchase-btn");
const userInput = document.querySelector("#cash");
const changeDue = document.querySelector("#change-due");
const cashInDrawer = document.querySelector("#cid");

let costumerPaidWith;
let price = 3.24;
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
const drawerStatus = {
open: 'Status: Open',
};

// look out for negative input!!
const getUserInput = () => {
  return costumerPaidWith = userInput.value;
}

const calcFaceValue = () => {
  const costumerPaidWith = getUserInput();
  let change = costumerPaidWith - price;
  const faceValues = [];
  for(i = cid.length - 1; i >= 0; i--){
    if(change >= moneyValues[i]){
      change = Math.round((change - moneyValues[i]) * 100) / 100;
      faceValues.push(moneyValues[i]);
      i++;
    } 
  }
  return faceValues;
}

const addEqualFaceValues = () => {
  const faceValues = calcFaceValue();
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
  changeDue.innerHTML += `<div>${drawerStatus.open}</div>`;
  namedChange.forEach(element => {
    changeDue.innerHTML += `<div>${element[0]}: ${element[1]}</div>`;
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

const updateCid = () => {
  const namedChange = associateChange();
  namedChange.forEach(el => {
    for(i = 0; i < cid.length; i++){
      if(el[0] === cid[i][0]){
        cid[i][1] = Math.round((cid[i][1] - el[1]) * 100) / 100;
      }
    }
  })
}

printCid();

purchaseBtn.addEventListener("click", () => {
  deleteData();
  getUserInput();
  printChange();
  updateCid();
  printCid();
})

