const table = document.querySelector("#row1_2 tbody");

import { generateId } from "./utils.js";
import {mostTransactionTypes} from "./transactions.js"
import {calculateTotalDebitAmount} from "./transactions.js"

export const transactions = [];
export const form = document.getElementById('add');


export function GetDataForm(event){
    event.preventDefault();
    const formData = new FormData(form);
    if(0>Number(formData.get("sum")) || Number(formData.get("sum"))>10000000 ){
        const errMsg = document.createElement("div");
        errMsg.innerHTML = "<p style =\"background-color: brown; color: white;\">incorect amount: must be positive and less then 10,000,000</p>";
        form.appendChild(errMsg);
        setTimeout(()=>errMsg.remove(), 5000);
    }
    else{
        addTransaction(formData);
    }
}

export function addTransaction(data) {
    const now = new Date();
    const formattedDate = now.toLocaleString('ru-RU');
    const newId = generateId(formattedDate);
    const transaction = {
        id: newId,
        date: formattedDate,
        amount: Number(data.get("sum")),
        type: data.get("type"),
        info: data.get("info")
    };

    transactions.push(transaction); // сохраняем

    renderTransaction(transaction); // отображаем
    document.getElementById("add").reset();
    updateTotalSum();
    console.log(transactions);
}

function renderTransaction(tx) {
    const newRow = document.createElement("tr");
    newRow.dataset.id = tx.id;
    newRow.addEventListener('click', handleRowClick);
    const cell1 = document.createElement("td");
    const cell2 = document.createElement("td");
    const cell3 = document.createElement("td");
    const cell4 = document.createElement("td");
    const sum = document.createElement("td");

    cell1.textContent = tx.date;
    cell2.textContent = tx.type;
    cell3.textContent = tx.info;
    sum.textContent = tx.amount;

    const btnDlt = document.createElement('button');
    btnDlt.textContent = "Удалить";
    btnDlt.onclick = () => {
        table.removeChild(newRow);
        // Удалим и из массива
        const index = transactions.indexOf(tx);
        if (index > -1) transactions.splice(index, 1);
        const bl = document.getElementById("row2_1");
        bl.innerHTML = '';
        updateTotalSum();
        console.log(transactions);
    };
    cell4.appendChild(btnDlt);

    newRow.appendChild(cell1);
    newRow.appendChild(cell2);
    newRow.appendChild(sum);
    newRow.appendChild(cell3);
    newRow.appendChild(cell4);

    if(tx.type === "debit")
        newRow.id="debit-g";
    else if(tx.type === "credit")
        newRow.id="credit-r";
    table.appendChild(newRow);
}

export function renderAllTransactions() {
    table.innerHTML = ''; // Очистим таблицу
    transactions.forEach(renderTransaction);
}

function handleRowClick(event) {
    if (event.target.tagName.toLowerCase() === 'button') return; // пропускаем кнопки

    const row = event.currentTarget;
    const id = row.dataset.id;

    const transaction = transactions.find(t => t.id === id);
    changeInfo(transaction);
}

function changeInfo(transaction){
    const bl = document.getElementById("row2_1");
    bl.innerHTML = '';
    const parag = document.createElement("p");
    parag.innerHTML = `
    Информация о транзакции:<br>
        id: ${transaction.id} <br>
        date: ${transaction.date} <br>
        amount: ${transaction.amount} <br>
        type: ${transaction.type} <br>
        info: ${transaction.info}
    `;
    bl.appendChild(parag);
}


function updateTotalSum(){
    const sum = document.getElementById("total_sum").lastElementChild;

    let total_amount = 0;

    for (const tx of transactions) {
        const amount = Number(tx.amount);
        if (tx.type === "debit") {
            total_amount += amount;
        } else if (tx.type === "credit") {
            total_amount -= amount;
        }
    }

    sum.innerText = total_amount.toLocaleString("ru-RU", { minimumFractionDigits: 2 });
}

function buttonMostTransactionTypes(){
    if(transactions.length==0){
    alert("transactions is empty");
    }
   
    const trns = mostTransactionTypes(transactions);
    alert(trns);
}
 document.getElementById("most_trns_type").addEventListener('click', buttonMostTransactionTypes)


 function buttonTotalDebitAmount(){
    if(transactions.length==0){
    alert("transactions is empty");
    }
   
    const trns = calculateTotalDebitAmount(transactions);
    alert("Total debit amount:"+trns);
}
document.getElementById("total_debi_amount").addEventListener('click', buttonTotalDebitAmount)