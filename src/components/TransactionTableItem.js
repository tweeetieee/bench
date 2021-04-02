import React, { useContext } from 'react'
import { FormatterContext } from './App'

export default function TransactionTableItem(props) {
    const { formatDate, formatAmount } = useContext(FormatterContext)
    const {
        date,
        ledger,
        amount,
        company
    } = props

    return (
        <tr className="transaction-table-item-row">
            <td className="muted-text">{formatDate(date)}</td>
            <td>{company}</td>
            <td className="muted-text">{ledger}</td>
            <td className="amount">{formatAmount(amount)}</td>
        </tr>
    )
}
