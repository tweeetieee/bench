import React, { useState, useEffect } from 'react';
import Title from './Title';
import TransactionTable from './TransactionTable';
import TransactionLoader from './TransactionLoader';
import ErrorMessage from './ErrorMessage';
import '../css/app.css';

export const FormatterContext = React.createContext();

const BASE_URL = "https://resttest.bench.co/transactions/";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let pagesRequired = 1;
    let currentPage = 1;
    fetch(BASE_URL + currentPage + ".json")
    .then(res => res.json())
    .then((result) => {
        console.log(result);
        pagesRequired = result.totalCount;
      },
      (error) => {
        setIsLoaded(true);
        setHasError(true);
      }
    )
  }, []);

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
      {isLoaded && !hasError
        ? <TransactionTable transactions={transactions} />
        : (hasError? <ErrorMessage /> : <TransactionLoader /> )
      }
    </FormatterContext.Provider>
  );
}

export default App;
