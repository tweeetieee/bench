import React, { useContext } from 'react';
import { FormatterContext } from './App';

export default function TransactionTableItem(props) {
    const {
        Date,
        Ledger,
        Amount,
        Company,
        isEmpty
    } = props;
    const { formatDate, formatAmount } = useContext(FormatterContext);

    return (
        <tr className="transaction-table-item-row">
            { isEmpty
                ? <td className="no-transactions" colSpan="4">There are currently no transactions</td>
                :<>
                    <td className="muted-text">{formatDate(Date)}</td>
                    <td>{Company}</td>
                    <td className="muted-text">{Ledger}</td>
                    <td className="amount">{formatAmount(Amount)}</td>
                </>
            }
        </tr>
    )
}
