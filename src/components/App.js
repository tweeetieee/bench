import React, { useState, useEffect } from 'react';
import Title from './Title';
import TransactionTable from './TransactionTable';
import TransactionLoader from './TransactionLoader';
import ErrorMessage from './ErrorMessage';
import axios from 'axios';
import '../css/app.css';

export const FormatterContext = React.createContext();

const BASE_URL = "https://resttest.bench.co/transactions/";
const JSON_EXTENSION = ".json";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let pagesRequired = 1;
    axios.get(BASE_URL + pagesRequired + JSON_EXTENSION)
    .then((response) => response.data)
    .then(data => {
      // Currently pages 5+ returns 404 so pagesRequired is manually set to 4 so the table renders
      // pagesRequired = data.totalCount;
      pagesRequired = 1;
      retrieveTransactions(pagesRequired);
    })
    .catch((error) => {
      setIsLoaded(true);
      setHasError(true);
    })
  }, []);

  function retrieveTransactions(pagesRequired){
    let promises = [];
    for (let i = 1; i <= pagesRequired; i++) {
      promises.push(axios.get(BASE_URL + i + JSON_EXTENSION));
    }
    Promise.all(promises)
    .then((responses) => {
      let newTransactions = [];
      responses.map((response)=> {
        if (response.data) {
          let currentTractions = response.data.transactions;
          newTransactions = newTransactions.concat(currentTractions);
        }
      });
      setTransactions(newTransactions);
      setIsLoaded(true);
    }).catch(error => {
      setIsLoaded(true);
      setHasError(true);
    });
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
      const dayNum = date.getDate();
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

  const formatterContextValue = {
    formatDate,
    formatAmount
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
