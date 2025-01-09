import React, { useState } from "react";
import InvoiceForm from "./components/InvoiceForm";
import InvoiceTable from "./components/InvoiceTable";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleInvoiceSaved = () => {
    setRefresh(prev => !prev); // Toggle refresh state to trigger re-fetching invoices
  };

  return (
    <div>
      <InvoiceForm onInvoiceSaved={handleInvoiceSaved} />
      <InvoiceTable refresh={refresh} />
    </div>
  );
}

export default App;
