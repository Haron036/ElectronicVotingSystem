import React, { forwardRef } from "react";
import { Watermark } from '@hirohe/react-watermark';

const PrintableReceipts = forwardRef(({ receipts = [], user, className = "" }, ref) => {
  return (
    <Watermark
      text="IEBC"
      rotate={-45}
      opacity={0.1}
      textSize={80}
      textColor="rgba(0, 128, 0, 0.15)" // greenish color with transparency
      wrapperStyle={{ width: "100%", height: "100%" }}
    >
      <div ref={ref} className={`p-8 font-sans ${className}`}>
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
    </Watermark>
  );
});

PrintableReceipts.displayName = "PrintableReceipts";

export default PrintableReceipts;
