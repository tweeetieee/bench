import React from 'react'
import TransactionTableHeader from './TransactionTableHeader'
import TransactionTableItem from './TransactionTableItem'

export default function TransactionTable( { transactions } ) {
    return (
        <div className="transaction-table-wrapper">
            <table className="transaction-table">
                <TransactionTableHeader /> 
                {transactions.map((transaction, index) => {
                    return (
                        <TransactionTableItem key={index} {...transaction} />
                    )
                })}
            </table>
        </div>
    
    )
}
