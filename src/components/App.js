import React from 'react';
import Title from './Title';
import TransactionTable from './TransactionTable';
import '../css/app.css';
export const FormatterContext = React.createContext();

function App() {
  const formatterContextValue = {
    formatDate,
    formatAmount
  }

  function dateOrdinal(num) {
    if (num === 31 || num === 21 || num === 1) {
        return num + "st";
    } else if (num === 22 || num === 2 ) {
        return num + "nd";
    } else if (num === 23 || num === 3) {
        return num + "rd";
    } else {
        return num + "th";
    }
  }
  
  function formatDate(formattedDate){
    if (formattedDate) {
      const date = new Date(formattedDate);
      const month = date.toLocaleString('default', { month: 'short' } );
      const dayNum = date.getDay();
      const year = date.getFullYear();
      return `${month} ${dateOrdinal(dayNum)}, ${year}`;
    }
    return "";
  }

  function formatAmount(amount){
    amount = amount ? amount : 0;
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return formatter.format(amount);
  }

  return (
    <FormatterContext.Provider value={formatterContextValue} >
      <Title />
      <TransactionTable transactions={testData} />
    </FormatterContext.Provider>
  );
}

const testData = [
  {
    "date": "2013-12-22",
    "ledger": "Phone & Internet Expense",
    "amount": "-110.71",
    "company": "SHAW CABLESYSTEMS CALGARY AB"
  },
  {
    "date": "2010-04-07",
    "ledger": "Interest Income",
    "amount": "5701.23",
    "company": "Momo Sushi Vancouver"
  }
]

export default App;
