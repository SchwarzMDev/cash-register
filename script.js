const purchaseBtn = document.querySelector("#purchase-btn");
const userInput = document.querySelector("#cash");
const changeDue = document.querySelector("#change-due");
const cashInDrawer = document.querySelector("#cid");

let drawerStatus;
let totalChange;
let remainingChange;
const price = 20;

// cid = cash-in-drawer
const cid = [
  ['PENNY', 2.00],
  ['NICKEL', 2.00],
  ['DIME', 4.1],
  ['QUARTER', 7.5],
  ['ONE', 70],
  ['FIVE', 55],
  ['TEN', 90],
  ['TWENTY', 80],
  ['ONE HUNDRED', 200]
];

const denominations = {
  'PENNY': 0.01,
  'NICKEL': 0.05,
  'DIME': 0.1,
  'QUARTER': 0.25,
  'ONE': 1,
  'FIVE': 5,
  'TEN': 10,
  'TWENTY': 20,
  'ONE HUNDRED': 100
};
const moneyKeys = Object.keys(denominations);
const moneyValues = Object.values(denominations);

const statusMessages = {
  'Open': 'Status: OPEN',
  'Close': 'Status: CLOSED',
  'Insufficient': 'Status: INSUFFICIENT_FUNDS',
  'Client cannot pay': 'Customer does not have enough money to purchase the item',
  'No change': 'No change due - customer paid with exact cash'
};

const getUserInput = () => {
  customerPaidWith = Math.round(Number(userInput.value) * 100) / 100;
  userInput.value = customerPaidWith;
  const minDenomination = 0.01;
  const maxDenomination = price + 100;

  if(customerPaidWith < minDenomination){
    alert("You haven't paid yet!")
    userInput.value = "";
  } else if(customerPaidWith > maxDenomination){
    alert("Excuse me, you gave me too much!")
    userInput.value = "";
  } else {
    return customerPaidWith;
  }
}

const checkTotalChange = () => {
  totalChange = cid.reduce((totChange,change) => 
    totChange = Math.round((totChange + change[1]) * 100) / 100, 0);
}

remainingChange = checkTotalChange();

const calcFaceValue = () => {
  const customerPaidWith = getUserInput();
  const remainingCid = cid.map(el => el);
  let change = Math.round((customerPaidWith - price) * 100) / 100;
  const faceValues = [];
  checkTotalChange();

  for(let i = cid.length - 1; i >= 0; i--){
    if(change >= moneyValues[i] && cid[i][1] > 0 && totalChange >= change && remainingChange >= change){
      change = Math.round((change - moneyValues[i]) * 100) / 100;
      cid[i][1] = Math.round((cid[i][1] - moneyValues[i]) * 100) / 100;
      faceValues.push(moneyValues[i]);
      i++;
    } else {
      remainingCid.pop();
      remainingChange = remainingCid.reduce((remChange,change) => 
        remChange = Math.round((remChange + change[1]) * 100) / 100, 0);
    }
  }

  checkTotalChange();
  if(change > totalChange || change > 0){
    drawerStatus = 'Insufficient';
    return [];
  } else if(customerPaidWith < price){
    drawerStatus = 'Client cannot pay';
    return [];
  } else if(customerPaidWith === price){
    drawerStatus = 'No change';
    return [];
  } else if(totalChange === 0){
    drawerStatus = 'Close';
    return faceValues;
  } else{
    drawerStatus = 'Open';
    return faceValues;
  }
  
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
  const sortedChange = Object.entries(change).toSorted(([a,], [b,]) => b - a);
  return sortedChange;
}

const associateChange = () => {
  const sortedChange = sortChange();
  const namedChange = sortedChange.map((value) => {
    const newArray = [];
    for(let i = 0; i < moneyValues.length; i++){
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
  //userInput.value = "";
  changeDue.innerHTML = ``;
  cashInDrawer.innerHTML = ``;
}

const printCid = () => {
  for(let i = 0; i < cid.length; i++){
    cashInDrawer.innerHTML += `<div>${cid[i][0]}: ${cid[i][1]}</div>`;
    }
}

printCid();

purchaseBtn.addEventListener("click", () => {
  deleteData();
  printChange();
  printCid();
})

