import React, { useContext } from 'react'
import { FormatterContext } from './App'

export default function TransactionTableItem(props) {
    const { formatDate, formatAmount } = useContext(FormatterContext)
    const {
        Date,
        Ledger,
        Amount,
        Company
    } = props

    return (
        <tr className="transaction-table-item-row">
            <td className="muted-text">{formatDate(Date)}</td>
            <td>{Company}</td>
            <td className="muted-text">{Ledger}</td>
            <td className="amount">{formatAmount(Amount)}</td>
        </tr>
    )
}
