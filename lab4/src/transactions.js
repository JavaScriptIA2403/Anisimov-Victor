
   export function getUniqueTransactionTypes(transactions){
        let types_of_transactions=[];
        for(const item of transactions){
            types_of_transactions.push(item.transaction_type);
        }
        let unique_transactions=Array.from(new Set(types_of_transactions));
        return unique_transactions; 
    }

//  const unique_transactions = getUniqueTransactionTypes(transactions);
//  console.log("unique types for transactions is:");
//  for(const item of unique_transactions){
//     console.log(item);
//  } 

export function calculateTotalAmount(transactions){
    const total_amount = transactions.reduce((sum, transaction) => sum + transaction.transaction_amount, 0);
    return total_amount;
 }

//  const sum = calculateTotalAmount(transactions);
//  console.log(`total amount is: ${sum}`);

export function calculateTotalAmountByDate(transactions, year, month, day){
    console.log(`total amount for transactions sorted by date: (${year}.${month}.${day})`)
    /*const compareDate = (transaction_date)=>{
        const date = new Date(transaction_date);
        if (year && date.getFullYear() !== year) return false;
        if (month && date.getMonth() + 1 !== month) return false;
        if (day && date.getDate() !== day) return false;
        return true;
    }
    let sum=0;
    for(const item of transactions){
        if(compareDate(item.transaction_date)){
            sum+=item.transaction_amount;
        }
    }
    return sum;*/

    const compareDate = transactions.filter(transaction=>{
        const date = new Date(transaction.transaction_date);
        return ((!year || date.getFullYear() == year) 
            && (!month || date.getMonth() + 1 == month) 
            && (!day || date.getDate() == day));
    });
    const total_amount = compareDate.reduce((sum, transaction) => sum + transaction.transaction_amount, 0);
    return total_amount;
  }

//   const sum1 = calculateTotalAmountByDate(transactions, 2019, 1,1);
//   console.log(sum1);

  function getTransactionByType(transactions, type){
    let right_transactions = [];
    for(const item of transactions){
        if(type===item.type)
            right_transactions.push(item);
    }
    return right_transactions;
  }

// const trans_by_type = getTransactionByType(transactions, "debit");
// console.log("transactions with type \"debit\":");
// console.log(trans_by_type);


export function getTransactionsInDateRange(transactions, startDate, endDate){
    console.log(`items in range of dates: ${startDate}  -  ${endDate}`);
      const start = new Date(startDate);
      const end = new Date(endDate);
    
      const filtered_transactions = transactions.filter(transaction => {
          const transaction_date = new Date(transaction.transaction_date);

          return transaction_date >= start && transaction_date <= end;
      });
  
      return filtered_transactions;
}

// const trans_by_two_dates = getTransactionsInDateRange(transactions, "2019-1-1", "2019-1-10");
// console.log(trans_by_two_dates);

export function getTransactionsByMerchant(transactions, merchant_name){
    right_transactions=[];
    console.log(`transactions whit Merchant Name: \"${merchant_name}\"`);
    for(const item of transactions){
        if(merchant_name==item.merchant_name)
            right_transactions.push(item);
    }
    return right_transactions;
}

// const trans_by_merchant = getTransactionsByMerchant(transactions, "Cafe123");
// console.log(trans_by_merchant);

export function calculateAverageTransactionAmount(transactions){
    return calculateTotalAmount(transactions)/transactions.length;
}

// const avg_amount = calculateAverageTransactionAmount(transactions);
// console.log(`avg amount is: ${avg_amount}`);

export function getTransactionsByAmountRange(transactions, minAmount, maxAmount){
    console.log(`items in range of amounts: ${minAmount}  -  ${maxAmount}`);
    const right_transactions = transactions.filter(transaction =>{
        return transaction.transaction_amount>= minAmount && transaction.transaction_amount<=maxAmount;
    })
    return right_transactions;
}

// const trans_by_amount_range = getTransactionsByAmountRange(transactions, 0, 50);
// console.log(trans_by_amount_range);

export function calculateTotalDebitAmount(transactions){
    const total_amount = getTransactionByType(transactions, "debit")
    .reduce((sum,transaction) => sum + transaction.amount, 0);

    return total_amount;
}

// const total_debit_amount = calculateTotalDebitAmount(transactions);
// console.log(`total debit amount is: ${total_debit_amount}`);

export function findMostTransactionsMonth(transactions){
    let month_amount =[];
    for(let i = 0; i<transactions.length;i++){
        const date = new Date(transactions[i].transaction_date);
        if(month_amount.some(item => item.month === date.getMonth()+1)) 
            continue;
        const this_month = transactions.filter((transaction) =>date.getMonth() === new Date(transaction.transaction_date).getMonth()).length;
        month_amount.push({amount : this_month, month : date.getMonth() + 1});
    }
    const max = Math.max(...month_amount.map(value=>value.amount));
    const max_month = month_amount.filter(item => item.amount===max);

    return max_month;
}

// const max_month = findMostTransactionsMonth(transactions);
// console.log("Max month(s):");
// console.log(max_month);

export function findMostDebitTransactionMonth(transactions){
    let month_amount =[];
    for(let i = 0; i<transactions.length;i++){
        const date = new Date(transactions[i].transaction_date);
        if(month_amount.some(item => item.month === date.getMonth()+1)) 
            continue;
        const this_month = transactions.filter((transaction) => transaction.transaction_type === "debit" && date.getMonth() === new Date(transaction.transaction_date).getMonth()).length;
        month_amount.push({amount : this_month, month : date.getMonth() + 1});
    }
    const max = Math.max(...month_amount.map(value=>value.amount));
    const max_month = month_amount.filter(item => item.amount===max);

    return max_month;
}

// const max_month_debit = findMostDebitTransactionMonth(transactions);
// console.log("Max debit month(s):")
// console.log(max_month_debit);

export function mostTransactionTypes(transactions){
    let total_debit=0;
    let total_credit=0;
    for(const item of transactions){
        if(item.type === "debit"){
            total_debit++;
        } else if(item.type === "credit"){
            total_credit++;
        }
    }
    if(total_debit>total_credit){
        return "debit";
    } else if(total_debit<total_credit){
        return "credit";
    } 
    return "equal";
}

// const most_trans_type = mostTransactionTypes(transactions);
// console.log(`most transactions type is:  ${most_trans_type}`);

export function getTransactionsBeforeDate(transactions, date){
    console.log(`items befire date: ${date}`);

      const end = new Date(date);
    
      const filtered_transactions = transactions.filter(transaction => {
          const transaction_date = new Date(transaction.transaction_date);

          return transaction_date <= end;
      });
  
      return filtered_transactions;
}

// const trans_before_date = getTransactionsBeforeDate(transactions, "2019-01-09")
// console.log(trans_before_date);


export function findTransactionById(transactions, id){
    return transactions.filter(item => item.transaction_id === String(id));
}

// const transaction_by_id = findTransactionById(transactions, "30");
// console.log("transaction by 30 is:");
// console.log(transaction_by_id);

function mapTransactionDescriptions(transactions){
    return transactions.map(item => item = item.transaction_description);
}

// const description_trans = mapTransactionDescriptions(transactions);
// console.log("description transactions is:");
// console.log(description_trans);