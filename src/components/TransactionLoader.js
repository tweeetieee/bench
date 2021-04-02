import React from 'react';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function TransactionLoader() {
    return (
        <div className="transaction-loader-wrapper">
            <Loader
                type="ThreeDots"
                color="#cdcdcd"
                height={50}
                width={50}
            />
        </div>
    )
}
