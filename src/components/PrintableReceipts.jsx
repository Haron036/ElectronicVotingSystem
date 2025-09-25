import React, { forwardRef } from "react";
import "./PrintableReceipts.css"; 

const PrintableReceipts = forwardRef(({ receipts = [], user, className = "" }, ref) => {
  return (
    <div className={`relative p-8 font-sans ${className}`} ref={ref}>
      {/* Watermark wrapper */}
      <div className="watermark-wrapper">
        <span className="watermark-text">IEBC</span>
      </div>

      <h1 className="text-3xl text-green-500 font-bold mb-4">
        Voting Receipts for {user?.firstName} {user?.lastName}
      </h1>
      <p className="text-sm text-green-500 mb-6">
        Generated on: {new Date().toLocaleString()}
      </p>

      {receipts.length === 0 ? (
        <p className="text-green-500">No voting receipts to display.</p>
      ) : (
        <div className="space-y-4">
          {receipts.map((receipt) => (
            <div key={receipt.id} className="border border-gray-300 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{receipt.electionTitle}</h3>
                <span className="text-xs text-green-500">Receipt ID: {receipt.id}</span>
              </div>
              <p className="text-sm text-green-500">Candidate Voted For: {receipt.candidateName}</p>
              <p className="text-sm text-gray-500">
                Voted on: {new Date(receipt.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

PrintableReceipts.displayName = "PrintableReceipts";

export default PrintableReceipts;
