import React, { useContext } from 'react';
import TransactionTableHeader from './TransactionTableHeader';
import TransactionTableItem from './TransactionTableItem';
import { FormatterContext } from './App';

export default function TransactionTable(props) {
    const {
        transactions
    } = props;
    const { formatAmount } = useContext(FormatterContext);

    function calculateTransactionSum() {
        let sum = transactions.reduce(function(prev, cur) {
                return prev + parseFloat(cur.Amount);
            }, 0);
        return formatAmount(sum);
    }
    return (
        <div className="transaction-table-wrapper">
            <table className="transaction-table">
                <TransactionTableHeader transactionSum={calculateTransactionSum()}  /> 
                <tbody>
                    {transactions.map((transaction, index) => {
                        return (
                            <TransactionTableItem key={index} {...transaction} />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
