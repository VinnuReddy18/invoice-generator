import React, { useState } from "react";
import axios from "axios";
import InvoicePreview from "./InvoicePreview";
import './InvoiceForm.css';

function InvoiceForm({ onInvoiceSaved }) {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [products, setProducts] = useState([]);
  const [tax, setTax] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");

  const handleAddProduct = () => {
    setProducts([...products, { name: "", price: 0, quantity: 0 }]);
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const calculateTotal = () => {
    const subtotal = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
    const calculatedTotal = subtotal + (subtotal * tax) / 100;
    return { subtotal, calculatedTotal };
  };

  const handleSubmit = async () => {
    if (!customerName || !customerEmail || products.length === 0 || tax === "") {
      setError("All fields are mandatory.");
      return;
    }
    setError("");
    const { subtotal, calculatedTotal } = calculateTotal();
    const newInvoice = { customerName, customerEmail, products, tax, total: calculatedTotal };
    await axios.post("http://localhost:5000/api/invoices", newInvoice);
    setTotal(calculatedTotal);
    setShowPreview(true);
    onInvoiceSaved();
  };

  const resetForm = () => {
    setCustomerName("");
    setCustomerEmail("");
    setProducts([]);
    setTax("");
    setTotal(0);
    setShowPreview(false);
  };

  return (
    <div className="invoice-form">
      <h2>Create Invoice</h2>
      {error && <p className="error">{error}</p>}
      <input placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
      <input placeholder="Customer Email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} required />
      {products.map((product, index) => (
        <div key={index} className="product-input">
          <input placeholder="Product Name" onChange={(e) => handleProductChange(index, "name", e.target.value)} required />
          <input placeholder="Price (₹)" type="number" onChange={(e) => handleProductChange(index, "price", parseFloat(e.target.value))} required />
          <input placeholder="Quantity" type="number" onChange={(e) => handleProductChange(index, "quantity", parseInt(e.target.value))} required />
        </div>
      ))}
      <button className="add-product-button" onClick={handleAddProduct}>Add Product</button>
      <input placeholder="Tax" type="number" value={tax} onChange={(e) => setTax(parseFloat(e.target.value))} required />
      {showPreview && <InvoicePreview customerName={customerName} products={products} tax={tax} total={total} onDownloadComplete={resetForm} />}
      <button className="save-invoice-button" onClick={handleSubmit}>Save Invoice</button>
    </div>
  );
}

export default InvoiceForm;
