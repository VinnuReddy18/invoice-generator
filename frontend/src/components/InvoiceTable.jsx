import React, { useEffect, useState } from "react";
import axios from "axios";
import './InvoiceTable.css';

function InvoiceTable({ refresh }) {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      const res = await axios.get("https://backend-invoice-two.vercel.app/api/invoices");
      setInvoices(res.data);
    };
    fetchInvoices();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://backend-invoice-two.vercel.app/api/invoices/${id}`);
      setInvoices(invoices.filter(invoice => invoice.id !== id));
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  return (
    <div className="invoice-table-container">
      <h2>Past Invoices</h2>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Email</th>
            <th>Total (₹)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.customerName}</td>
              <td>{invoice.customerEmail}</td>
              <td>₹{invoice.total.toFixed(2)}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(invoice.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InvoiceTable;
