import React from 'react'

export default function TransactionTableHeader() {
    return (
        <thead>
            <tr className="transaction-table-header-row">
                <th>Date</th>
                <th>Company</th>
                <th>Account</th>
                <th className="sum">Sum</th>
            </tr>
        </thead>
    )
}
